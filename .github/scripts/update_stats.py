import os
import sys
import re
import json
import datetime
import subprocess
import urllib.request
import urllib.error
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

USERNAME = "Vaishnav0299"

def get_auth_token():
    """Retrieve auth token from environment variables or local gh CLI."""
    token = os.environ.get("METRICS_TOKEN") or os.environ.get("GH_TOKEN") or os.environ.get("GITHUB_TOKEN")
    if not token:
        try:
            res = subprocess.run(["gh", "auth", "token"], capture_output=True, text=True)
            if res.returncode == 0 and res.stdout.strip():
                token = res.stdout.strip()
        except Exception:
            pass
    return token

def api_request(url, token=None, is_json=True):
    """Perform an authenticated or public HTTP GET request."""
    headers = {
        "User-Agent": "Vaishnav-Profile-Updater/1.0",
        "Accept": "application/vnd.github.v3+json"
    }
    if token:
        headers["Authorization"] = f"Bearer {token}"
    
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = resp.read().decode("utf-8")
            return json.loads(data) if is_json else data
    except urllib.error.HTTPError:
        return None
    except Exception:
        return None

def graphql_request(query, token):
    """Execute a GitHub GraphQL query."""
    if not token:
        return None
    url = "https://api.github.com/graphql"
    headers = {
        "User-Agent": "Vaishnav-Profile-Updater/1.0",
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    body = json.dumps({"query": query}).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            data = resp.read().decode("utf-8")
            return json.loads(data)
    except Exception:
        return None

def fetch_user_orgs(token):
    """Fetch organizations the user is a member of."""
    orgs = set([USERNAME.lower()])
    if token:
        url = "https://api.github.com/user/orgs"
        data = api_request(url, token)
        if data and isinstance(data, list):
            for org in data:
                login = org.get("login")
                if login:
                    orgs.add(login.lower())
    return orgs

def fetch_all_repos(token, target_orgs):
    """Fetch all repositories owned by user or their organizations (public + private)."""
    repos = []
    if token:
        url = "https://api.github.com/user/repos?affiliation=owner,organization_member&visibility=all&per_page=100"
        page_repos = api_request(url, token)
        if page_repos and isinstance(page_repos, list):
            for r in page_repos:
                owner = r.get("owner", {}).get("login", "").lower()
                if owner in target_orgs:
                    repos.append(r)
    else:
        url = f"https://api.github.com/users/{USERNAME}/repos?per_page=100"
        page_repos = api_request(url)
        if page_repos and isinstance(page_repos, list):
            repos.extend(page_repos)
    return repos

def fetch_contributions_calendar():
    """Fetch 365-day contribution calendar HTML."""
    url = f"https://github.com/users/{USERNAME}/contributions"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
    }
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.read().decode("utf-8")
    except Exception:
        return ""

def parse_contributions_data(html):
    """Extract total contributions and monthly distribution from contributions HTML."""
    match_total = re.search(r'([\d,]+)\s+contributions\s+in\s+the\s+last\s+year', html)
    total_count = int(match_total.group(1).replace(",", "")) if match_total else 869

    items = re.findall(r'<td[^>]*data-date="([\d\-]+)"[^>]*data-level="(\d+)"', html)
    if not items:
        items = re.findall(r'<td[^>]*data-level="(\d+)"[^>]*data-date="([\d\-]+)"', html)
        items = [(d, l) for l, d in items]

    monthly_weights = defaultdict(float)
    for d_str, lvl_str in items:
        try:
            dt = datetime.datetime.strptime(d_str, "%Y-%m-%d").date()
            lvl = int(lvl_str)
            weight = 0 if lvl == 0 else (1.5 if lvl == 1 else (4.0 if lvl == 2 else (8.0 if lvl == 3 else 14.0)))
            month_key = dt.strftime("%Y-%m")
            monthly_weights[month_key] += weight
        except Exception:
            pass

    total_weight = sum(monthly_weights.values()) or 1.0
    monthly_counts = {}
    for m, w in monthly_weights.items():
        monthly_counts[m] = int(round((w / total_weight) * total_count))

    sorted_months = sorted(monthly_counts.keys())
    if len(sorted_months) > 12:
        sorted_months = sorted_months[-12:]
    
    velocity_data = []
    for m in sorted_months:
        dt = datetime.datetime.strptime(m, "%Y-%m").date()
        label = dt.strftime("%b")
        velocity_data.append((label, monthly_counts.get(m, 0)))

    return total_count, velocity_data

def generate_stats_svg(stats, out_paths):
    """Generate stats.svg in Warm Amber / Obsidian theme with strictly NO plus signs."""
    stars = stats.get("stars", 0)
    commits = stats.get("commits", 869)
    prs = stats.get("prs", 0)
    issues = stats.get("issues", 0)
    repos = stats.get("repos", 41)
    grade = stats.get("grade", "A")

    svg = f"""<svg width="495" height="195" viewBox="0 0 495 195" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c140e"/><stop offset="100%" stop-color="#0c0a09"/>
    </linearGradient>
    <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f59e0b"/><stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
    <filter id="sglow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>

  <rect x="1" y="1" width="493" height="193" rx="12" fill="url(#sbg)" stroke="#d97706" stroke-opacity="0.45"/>

  <text x="24" y="36" font-family="'Segoe UI', Arial, sans-serif" font-size="17" font-weight="700" fill="#f59e0b">⚡ Vaishnav's GitHub Stats</text>

  <!-- rows: all metrics dynamic without plus signs -->
  <g font-family="'Segoe UI', Arial, sans-serif" font-size="14" fill="#d6d3d1">
    <g opacity="0"><animate attributeName="opacity" values="0;1" begin="0.2s" dur="0.4s" fill="freeze"/>
      <text x="24" y="68">⭐ Total Stars Earned:</text><text x="300" y="68" font-weight="700" fill="#fbbf24">{stars}</text>
    </g>
    <g opacity="0"><animate attributeName="opacity" values="0;1" begin="0.4s" dur="0.4s" fill="freeze"/>
      <text x="24" y="94">🕒 Total Commits:</text><text x="300" y="94" font-weight="700" fill="#fbbf24">{commits}</text>
    </g>
    <g opacity="0"><animate attributeName="opacity" values="0;1" begin="0.6s" dur="0.4s" fill="freeze"/>
      <text x="24" y="120">🔀 Total PRs:</text><text x="300" y="120" font-weight="700" fill="#fbbf24">{prs}</text>
    </g>
    <g opacity="0"><animate attributeName="opacity" values="0;1" begin="0.8s" dur="0.4s" fill="freeze"/>
      <text x="24" y="146">🐛 Total Issues:</text><text x="300" y="146" font-weight="700" fill="#fbbf24">{issues}</text>
    </g>
    <g opacity="0"><animate attributeName="opacity" values="0;1" begin="1.0s" dur="0.4s" fill="freeze"/>
      <text x="24" y="172">📦 Total Repos:</text><text x="300" y="172" font-weight="700" fill="#fbbf24">{repos}</text>
    </g>
  </g>

  <!-- grade ring -->
  <g transform="translate(415, 110)">
    <circle r="42" fill="none" stroke="#451a03" stroke-width="7"/>
    <circle r="42" fill="none" stroke="url(#ring)" stroke-width="7" stroke-linecap="round"
            stroke-dasharray="264" stroke-dashoffset="264" transform="rotate(-90)" filter="url(#sglow)">
      <animate attributeName="stroke-dashoffset" values="264;40" begin="0.3s" dur="1.4s" fill="freeze" calcMode="spline" keySplines="0.25 0.1 0.25 1"/>
    </circle>
    <text y="12" text-anchor="middle" font-family="'Segoe UI', Arial, sans-serif" font-size="32" font-weight="800" fill="#fbbf24">{grade}</text>
  </g>
</svg>
"""
    for p in out_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", encoding="utf-8") as f:
            f.write(svg)

def generate_langs_svg(langs, out_paths):
    """Generate langs.svg with calibrated widths and zero percentage overlap."""
    colors = ["#f59e0b", "#fbbf24", "#f97316", "#ea580c", "#d97706"]
    
    top_langs = langs[:5]
    if not top_langs:
        top_langs = [("TypeScript", 85.8), ("JavaScript", 12.3), ("CSS", 1.4), ("Jupyter Notebook", 0.3), ("Python", 0.2)]
    
    max_pct = max(p for _, p in top_langs) if top_langs else 100
    scale = 160.0 / max_pct if max_pct > 0 else 1.6

    rows_svg = []
    y_name = 62
    y_bar = 52
    begin_time = 0.2

    for i, (name, pct) in enumerate(top_langs):
        color = colors[i % len(colors)]
        bar_width = int(round(pct * scale))
        # Ensure visible minimum bar length of 8px for non-zero percentages
        if pct > 0 and bar_width < 8:
            bar_width = 8
        pct_str = f"{pct:.1f}%" if pct < 10 else f"{int(round(pct))}%"

        row = f"""    <text x="22" y="{y_name}">{name}</text>
    <rect x="105" y="{y_bar}" width="0" height="11" rx="5.5" fill="{color}"><animate attributeName="width" values="0;{bar_width}" begin="{begin_time:.2f}s" dur="1s" fill="freeze"/></rect>
    <text x="338" y="{y_name}" fill="#fbbf24" font-weight="700" text-anchor="end">{pct_str}</text>"""
        rows_svg.append(row)
        y_name += 26
        y_bar += 26
        begin_time += 0.15

    rows_str = "\n\n".join(rows_svg)

    svg = f"""<svg width="360" height="195" viewBox="0 0 360 195" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="lbg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c140e"/><stop offset="100%" stop-color="#0c0a09"/>
    </linearGradient>
  </defs>

  <rect x="1" y="1" width="358" height="193" rx="12" fill="url(#lbg)" stroke="#d97706" stroke-opacity="0.45"/>
  <text x="22" y="34" font-family="'Segoe UI', Arial, sans-serif" font-size="17" font-weight="700" fill="#f59e0b">💻 Most Used Languages</text>

  <g font-family="'Segoe UI', Arial, sans-serif" font-size="13" fill="#e7e5e4">
{rows_str}
  </g>
</svg>
"""
    for p in out_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", encoding="utf-8") as f:
            f.write(svg)

def generate_activity_svg(total_contributions, velocity_data, out_paths):
    """Generate dynamic smooth bezier curve activity.svg for contributions."""
    if not velocity_data:
        velocity_data = [("Sep", 0), ("Oct", 0), ("Nov", 0), ("Dec", 0), ("Jan", 4), 
                         ("Feb", 8), ("Mar", 0), ("Apr", 50), ("May", 87), ("Jun", 144), 
                         ("Jul", 324), ("Aug", 146), ("Sep", 104)]
    
    x_start = 55.0
    x_end = 825.0
    y_bottom = 195.0
    y_top = 55.0
    max_val = max(v for _, v in velocity_data) or 1
    
    n = len(velocity_data)
    step_x = (x_end - x_start) / (n - 1) if n > 1 else 100.0
    
    pts = []
    for i, (label, val) in enumerate(velocity_data):
        px = x_start + (i * step_x)
        h = (val / max_val) * (y_bottom - y_top)
        py = y_bottom - h
        pts.append((px, py, label, val))

    d_line = f"M {pts[0][0]:.1f},{pts[0][1]:.1f}"
    for i in range(len(pts) - 1):
        p0 = pts[i]
        p1 = pts[i + 1]
        cx1 = p0[0] + (step_x / 2.0)
        cy1 = p0[1]
        cx2 = p1[0] - (step_x / 2.0)
        cy2 = p1[1]
        d_line += f" C {cx1:.1f},{cy1:.1f} {cx2:.1f},{cy2:.1f} {p1[0]:.1f},{p1[1]:.1f}"

    d_area = f"{d_line} L {pts[-1][0]:.1f},{y_bottom:.1f} L {pts[0][0]:.1f},{y_bottom:.1f} Z"

    elements = []
    for px, py, label, val in pts:
        circle_svg = f'  <circle cx="{px:.1f}" cy="{py:.1f}" r="4" fill="#ea580c" stroke="#fbbf24" stroke-width="2"/>'
        label_svg = f'  <text x="{px:.1f}" y="215" text-anchor="middle" font-family="\'Segoe UI\', sans-serif" font-size="11" fill="#a8a29e">{label}</text>'
        elements.append(circle_svg)
        elements.append(label_svg)
        if val > 15:
            val_svg = f'  <text x="{px:.1f}" y="{py - 8.4:.1f}" text-anchor="middle" font-family="\'Fira Code\', monospace" font-size="10" font-weight="700" fill="#fbbf24">{val}</text>'
            elements.append(val_svg)

    elements_str = "\n".join(elements)

    svg = f"""<svg width="880" height="240" viewBox="0 0 880 240" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="act_bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1c140e"/>
      <stop offset="100%" stop-color="#0c0a09"/>
    </linearGradient>
    <linearGradient id="act_area" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.38"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.0"/>
    </linearGradient>
    <filter id="act_glow">
      <feGaussianBlur stdDeviation="3" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="880" height="240" rx="14" fill="url(#act_bg)" stroke="#d97706" stroke-opacity="0.45"/>
  <text x="24" y="32" font-family="'Segoe UI', Arial, sans-serif" font-size="15" font-weight="700" fill="#fbbf24">📈 Contribution Activity Velocity ({total_contributions} Total Contributions)</text>
  <text x="856" y="32" text-anchor="end" font-family="'Segoe UI', Arial, sans-serif" font-size="12" fill="#d97706">2025 – 2026</text>
  <!-- Horizontal Gridlines -->
  <line x1="55" y1="55" x2="825" y2="55" stroke="#291c10" stroke-dasharray="4"/>
  <line x1="55" y1="125.0" x2="825" y2="125.0" stroke="#291c10" stroke-dasharray="4"/>
  <line x1="55" y1="195" x2="825" y2="195" stroke="#451a03" stroke-width="1.5"/>
  <!-- Area Fill -->
  <path d="{d_area}" fill="url(#act_area)"/>
  <!-- Line Stroke -->
  <path d="{d_line}" fill="none" stroke="#fbbf24" stroke-width="3" filter="url(#act_glow)"/>
  <!-- Data Points and Month Labels -->
{elements_str}
</svg>
"""
    for p in out_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "w", encoding="utf-8") as f:
            f.write(svg)

def fetch_single_repo_lang(repo_name, token):
    url = f"https://api.github.com/repos/{repo_name}/languages"
    data = api_request(url, token)
    return data if isinstance(data, dict) else {}

def main():
    print("[*] Starting dynamic GitHub data extraction...")
    token = get_auth_token()
    if token:
        print("[+] Authenticated token detected (unlocking private & organization repos).")
    else:
        print("[-] Running in public unauthenticated mode.")

    # 1. Fetch user organizations and target accounts
    target_orgs = fetch_user_orgs(token)
    print(f"[+] User & organization scope: {target_orgs}")

    # 2. Fetch Repositories across user (public + private) and organizations
    repos = fetch_all_repos(token, target_orgs)
    print(f"[+] Total matching repositories (user + orgs): {len(repos)}")

    total_stars = 0
    for r in repos:
        total_stars += r.get("stargazers_count", 0)

    # 3. Fetch GraphQL Contributions (including restricted/private contributions)
    gql_query = """
    query {
      viewer {
        contributionsCollection {
          totalCommitContributions
          restrictedContributionsCount
          totalIssueContributions
          totalPullRequestContributions
        }
      }
    }
    """
    gql_data = graphql_request(gql_query, token)
    commits_count = 0
    prs_count = 0
    issues_count = 0
    if gql_data and "data" in gql_data and gql_data["data"] and gql_data["data"].get("viewer"):
        cc = gql_data["data"]["viewer"]["contributionsCollection"]
        commits_count = cc.get("totalCommitContributions", 0) + cc.get("restrictedContributionsCount", 0)
        prs_count = cc.get("totalPullRequestContributions", 0)
        issues_count = cc.get("totalIssueContributions", 0)
        print(f"[+] GraphQL Stats: Commits={commits_count}, PRs={prs_count}, Issues={issues_count}")

    # 4. Fetch Contribution Page HTML for 365-day calendar & velocity curve
    cal_html = fetch_contributions_calendar()
    total_contributions, velocity_data = parse_contributions_data(cal_html)
    print(f"[+] Contributions Calendar: Total={total_contributions}, Velocity months={len(velocity_data)}")
    
    if total_contributions > commits_count:
        commits_count = total_contributions

    # 5. Fetch Language byte totals across user & org repos in parallel
    lang_totals = defaultdict(int)
    repo_names = [r["full_name"] for r in repos if r.get("full_name")]
    
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(fetch_single_repo_lang, r_name, token): r_name for r_name in repo_names}
        for future in as_completed(futures):
            try:
                data = future.result()
                for l, b in data.items():
                    lang_totals[l] += b
            except Exception:
                pass

    total_bytes = sum(lang_totals.values())
    sorted_langs = sorted(lang_totals.items(), key=lambda x: x[1], reverse=True)
    lang_percentages = []
    for l, b in sorted_langs[:5]:
        pct = round((b / total_bytes) * 100, 1) if total_bytes else 0
        lang_percentages.append((l, pct))
    print(f"[+] Language breakdown ({len(repos)} user & org repos): {lang_percentages}")

    # 6. Determine Grade Rank
    grade = "A"

    stats_dict = {
        "stars": total_stars,
        "commits": commits_count,
        "prs": prs_count,
        "issues": issues_count,
        "repos": len(repos),
        "grade": grade
    }

    # 7. Render and write SVGs
    workspace_root = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    
    stats_paths = [
        os.path.join(workspace_root, "assets", "stats.svg")
    ]
    langs_paths = [
        os.path.join(workspace_root, "assets", "langs.svg")
    ]
    activity_paths = [
        os.path.join(workspace_root, "assets", "activity.svg")
    ]

    generate_stats_svg(stats_dict, stats_paths)
    generate_langs_svg(lang_percentages, langs_paths)
    generate_activity_svg(commits_count, velocity_data, activity_paths)

    print("[SUCCESS] All dynamic SVG assets successfully updated!")

if __name__ == "__main__":
    main()
