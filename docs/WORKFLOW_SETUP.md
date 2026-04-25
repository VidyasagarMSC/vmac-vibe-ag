# GitHub Action Workflow Setup Guide

## Overview
The bi-weekly content update workflow automatically fetches and updates your portfolio with the latest information from multiple platforms.

## Features
- **Automated Article Updates**: Fetches latest articles from Dev.to, Medium, VMacWrites, Substack, Hackernoon, and DZone
- **Platform Statistics**: Updates follower counts, article counts, and engagement metrics
- **LinkedIn Integration**: Syncs profile headline and summary (requires API key)
- **GitHub Stats**: Automatically updates repository count
- **Bi-Weekly Schedule**: Runs every Monday and Thursday at midnight UTC

## Setup Instructions

### 1. LinkedIn API Integration (Optional)

To enable LinkedIn profile data synchronization:

1. **Get a RapidAPI Account**:
   - Sign up at [RapidAPI](https://rapidapi.com/)
   - Subscribe to [LinkedIn Data API](https://rapidapi.com/rockapis-rockapis-default/api/linkedin-data-api)
   - Copy your API key

2. **Add Secret to GitHub**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `LINKEDIN_API_KEY`
   - Value: Your RapidAPI key
   - Click "Add secret"

### 2. Manual Trigger

To manually trigger the workflow:

1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. Select "Bi-Weekly Content Update" from the left sidebar
4. Click "Run workflow" button
5. Select the branch (usually `main`)
6. Click "Run workflow"

### 3. Monitoring

Check workflow runs:
- Go to Actions tab
- Click on the latest workflow run
- Review logs for each step
- Check for any errors or warnings

## Data Sources

### Automatically Fetched
- ✅ Dev.to articles and follower count
- ✅ Medium articles
- ✅ VMacWrites blog posts
- ✅ Substack newsletter posts
- ✅ Hackernoon articles
- ✅ DZone articles and stats
- ✅ GitHub repository count

### Requires API Key
- 🔑 LinkedIn profile headline and summary

## Troubleshooting

### Workflow Fails
1. Check the Actions tab for error messages
2. Verify all RSS feeds are accessible
3. Ensure the portfolio.ts file structure is correct

### LinkedIn Data Not Updating
1. Verify `LINKEDIN_API_KEY` secret is set
2. Check RapidAPI subscription is active
3. Review workflow logs for LinkedIn fetch errors

### Articles Not Updating
1. Verify RSS feeds are accessible
2. Check if platforms have changed their feed URLs
3. Review the "Parse and merge all articles" step logs

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