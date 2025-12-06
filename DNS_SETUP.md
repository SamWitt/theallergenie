# DNS Setup for NameSilo

Follow these steps in NameSilo to point your domain to GitHub Pages for **www.theallergenie.com**.

## 1. Set the root domain (apex) A records
If you want the apex domain `theallergenie.com` to redirect to the site (alongside `www`), add four A records pointing to GitHub Pages' IP addresses:

| Host | Type | Value |
| --- | --- | --- |
| @ | A | 185.199.108.153 |
| @ | A | 185.199.109.153 |
| @ | A | 185.199.110.153 |
| @ | A | 185.199.111.153 |

## 2. Add the CNAME for `www`
Create a CNAME record so `www.theallergenie.com` resolves to your GitHub Pages site:

| Host | Type | Value |
| --- | --- | --- |
| www | CNAME | `<your-github-username>.github.io` |

Replace `<your-github-username>` with your actual GitHub username (for example, `example.github.io`).

## 3. Save and verify
1. Save the DNS records in NameSilo.
2. In the GitHub repository settings for the Pages site, set the custom domain to `www.theallergenie.com`.
3. Enable "Enforce HTTPS" once the certificate is issued.
4. DNS changes can take up to 24 hours to propagate. You can verify with `dig` or `nslookup` for `www.theallergenie.com` and `theallergenie.com`.

With these records and the `CNAME` file present in the repository, GitHub Pages will serve the site on your custom domain once DNS propagation completes.
