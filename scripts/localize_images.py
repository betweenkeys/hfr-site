"""Download images the site still loads from Squarespace and point the pages at local copies.

Runs in GitHub Actions (see .github/workflows/localize-images.yml), because it needs
internet access. Safe to run again: it only touches URLs that still point at Squarespace.
"""
import pathlib, re, sys, urllib.parse, urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets' / 'img' / 'site'
PATTERN = re.compile(r'https://images\.squarespace-cdn\.com/[^"\')\s]+')

def local_name(url):
    path = urllib.parse.urlparse(url).path
    name = urllib.parse.unquote(path.rsplit('/', 1)[-1])
    stem, _, ext = name.rpartition('.')
    stem = re.sub(r'[^a-z0-9]+', '-', stem.lower()).strip('-') or 'image'
    ext = (ext or 'jpg').lower().replace('jpeg', 'jpg')
    return f'{stem}.{ext}'

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    pages = sorted(ROOT.rglob('*.html'))
    urls = sorted({u for p in pages for u in PATTERN.findall(p.read_text(encoding='utf-8'))})
    if not urls:
        print('Nothing to do.')
        return
    mapping, failed = {}, []
    for url in urls:
        name = local_name(url)
        dest = OUT / name
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (hfr-site image localizer)'})
            with urllib.request.urlopen(req, timeout=60) as r:
                data = r.read()
            if len(data) < 500:
                raise ValueError(f'suspiciously small ({len(data)} bytes)')
            dest.write_bytes(data)
            mapping[url] = '/assets/img/site/' + name
            print(f'ok   {name}  {len(data)//1024} KB')
        except Exception as e:
            failed.append(url)
            print(f'FAIL {url}: {e}', file=sys.stderr)
    for p in pages:
        text = p.read_text(encoding='utf-8')
        new = text
        for url, local in mapping.items():
            new = new.replace(url, local)
        if new != text:
            p.write_text(new, encoding='utf-8')
            print(f'updated {p.relative_to(ROOT)}')
    if failed:
        print(f'{len(failed)} image(s) failed; their pages still use the Squarespace link.', file=sys.stderr)

if __name__ == '__main__':
    main()
