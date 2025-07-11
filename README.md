# Hemolog Supabase Backend

This repository contains the Supabase backend configuration for Hemolog, including Edge Functions, database migrations, and CI/CD pipeline.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase CLI
- GitHub account with repository access

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hemolog_v0_supabase
   ```

2. **Install Supabase CLI**
   ```bash
   npm install -g supabase@latest
   ```

3. **Link to your Supabase project**
   ```bash
   supabase link --project-ref wbnixypynbfwmwucplmp
   ```

4. **Start local development**
   ```bash
   supabase start
   ```

## 🔧 Edge Functions

### Available Functions

- **`send-welcome-email`**: Sends welcome emails to new waitlist signups
  - Uses Resend API for email delivery
  - Includes both HTML and text versions
  - Branded with Hemolog styling

### Local Development

```bash
# Deploy a specific function
supabase functions deploy send-welcome-email

# Deploy all functions
supabase functions deploy

# Test function locally
supabase functions serve send-welcome-email
```

## 🚀 CI/CD Pipeline

This repository includes automated deployment via GitHub Actions.

### How it works

1. **Push to main branch**: Automatically deploys all Edge Functions
2. **Pull Request**: Runs validation tests without deployment
3. **Path-based triggers**: Only runs when `supabase/functions/**` files change

### Setup Required

You need to add these secrets to your GitHub repository:

1. Go to your GitHub repository settings
2. Navigate to **Secrets and variables** → **Actions**
3. Add these secrets:

   - `SUPABASE_ACCESS_TOKEN`: Your Supabase access token
   - `SUPABASE_PROJECT_REF`: Your project reference (e.g., `wbnixypynbfwmwucplmp`)

### Getting Supabase Access Token

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **Account** → **Access Tokens**
3. Generate a new token with appropriate permissions
4. Copy the token to your GitHub secrets

### Manual Deployment

If you need to deploy manually:

```bash
# Deploy all functions
supabase functions deploy --project-ref wbnixypynbfwmwucplmp

# Deploy specific function
supabase functions deploy send-welcome-email --project-ref wbnixypynbfwmwucplmp
```

## 📁 Project Structure

```
hemolog_v0_supabase/
├── .github/
│   └── workflows/
│       └── supabase-deploy.yml    # CI/CD pipeline
├── supabase/
│   ├── config.toml                # Supabase configuration
│   ├── functions/
│   │   └── send-welcome-email/    # Email function
│   └── migrations/                # Database migrations
└── README.md
```

## 🔐 Environment Variables

The Edge Functions require these environment variables:

- `RESEND_API_KEY`: Your Resend API key for email sending

### Setting Environment Variables

1. **Via Supabase Dashboard**:
   - Go to **Settings** → **Edge Functions**
   - Add environment variables

2. **Via CLI**:
   ```bash
   supabase secrets set RESEND_API_KEY=your_api_key
   ```

## 📧 Email Function Details

The `send-welcome-email` function:

- **Trigger**: Called from the main landing page when users join waitlist
- **Features**: 
  - Professional HTML email template
  - Mobile-responsive design
  - Brand-consistent styling
  - Both HTML and text versions
  - Trust badges and compliance info
- **Dependencies**: Resend API for email delivery

## 🛠️ Development Workflow

1. **Make changes** to Edge Functions
2. **Test locally** with `supabase functions serve`
3. **Push to main** for automatic deployment
4. **Monitor deployment** in GitHub Actions

## 📊 Monitoring

- **GitHub Actions**: Check deployment status in Actions tab
- **Supabase Dashboard**: Monitor function logs and performance
- **Email Delivery**: Check Resend dashboard for email delivery status

## 🔧 Troubleshooting

### Common Issues

1. **Deployment fails**:
   - Check GitHub secrets are set correctly
   - Verify Supabase access token has proper permissions
   - Check function syntax and dependencies

2. **Email not sending**:
   - Verify `RESEND_API_KEY` is set
   - Check function logs in Supabase dashboard
   - Test with valid email address

3. **Local development issues**:
   - Ensure Docker is running for local Supabase
   - Check Node.js version (18+ required)
   - Verify Supabase CLI is installed

### Getting Help

- Check [Supabase Documentation](https://supabase.com/docs)
- Review [GitHub Actions logs](https://github.com/your-repo/actions)
- Check [Supabase Dashboard](https://supabase.com/dashboard) for logs

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

The CI/CD pipeline will automatically test your changes before merging.

---

**Hemolog Health Technologies** - Dehradun, Uttarakhand, India
