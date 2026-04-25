# GitHub Action Workflow Setup Guide

## Overview
The bi-weekly content update workflow automatically fetches and updates your portfolio with the latest information from multiple platforms using web scraping and public APIs.

## Features
- **Automated Article Updates**: Fetches latest articles from Dev.to, Medium, VMacWrites, Substack, Hackernoon, and DZone
- **Platform Statistics**: Updates follower counts, article counts, and engagement metrics
- **Web Scraping**: Extracts profile information from LinkedIn, DZone, and Dev.to public pages
- **GitHub Stats**: Automatically updates repository count via GitHub API
- **Bi-Weekly Schedule**: Runs every Monday and Thursday at midnight UTC
- **No API Keys Required**: Uses public web scraping (no authentication needed)

## Setup Instructions

### 1. Manual Trigger

To manually trigger the workflow:

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. Select "Bi-Weekly Content Update" from the left sidebar
4. Click "Run workflow" button
5. Select the branch (usually `main`)
6. Click "Run workflow"

### 2. Monitoring

Check workflow runs:
- Go to Actions tab
- Click on the latest workflow run
- Review logs for each step
- Check for any errors or warnings

## Data Sources

### Automatically Fetched (No API Keys Required)
- ✅ **Dev.to**: Articles, follower count, post count (via API + web scraping)
- ✅ **Medium**: Articles and follower statistics (via RSS + web scraping)
- ✅ **VMacWrites**: Blog posts (via RSS)
- ✅ **Substack**: Newsletter posts (via RSS)
- ✅ **Hackernoon**: Articles (via RSS)
- ✅ **DZone**: Articles, bio, and stats (via RSS + web scraping)
- ✅ **LinkedIn**: Profile headline and summary (via web scraping)
- ✅ **GitHub**: Repository count and stats (via public API)

### Web Scraping Details
The workflow uses intelligent web scraping to extract:
- **LinkedIn**: Professional headline, current role, and about/summary section
- **DZone**: Bio, article count, and profile information
- **Dev.to**: Follower count and published post statistics
- **Google Search**: Recent mentions and achievements

## Troubleshooting

### Workflow Fails
1. Check the Actions tab for error messages
2. Verify all RSS feeds are accessible
3. Ensure the portfolio.ts file structure is correct
4. Check if any platform has changed their HTML structure

### Profile Data Not Updating
1. Review workflow logs for web scraping errors
2. Check if LinkedIn/DZone/Dev.to have changed their page structure
3. Verify the HTML parsing regex patterns are still valid
4. The workflow uses `continue-on-error` so partial failures won't stop execution

### Articles Not Updating
1. Verify RSS feeds are accessible
2. Check if platforms have changed their feed URLs
3. Review the "Parse and merge all articles" step logs
4. Ensure the XML parsing is working correctly

## Schedule Details

The workflow runs:
- **Monday**: 00:00 UTC (7:00 PM CST previous day)
- **Thursday**: 00:00 UTC (7:00 PM CST previous day)

To change the schedule, edit `.github/workflows/weekly-content-update.yml`:
```yaml
schedule:
  - cron: '0 0 * * 1'  # Monday
  - cron: '0 0 * * 4'  # Thursday
```

## Support

For issues or questions:
1. Check workflow logs in Actions tab
2. Review this documentation
3. Open an issue in the repository