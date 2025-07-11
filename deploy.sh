#!/bin/bash

# Hemolog Supabase Deployment Script
# This script deploys Edge Functions to Supabase

set -e

echo "🚀 Starting Hemolog Supabase deployment..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI is not installed. Please install it first:"
    echo "npm install -g supabase@latest"
    exit 1
fi

# Check if project reference is provided
PROJECT_REF=${1:-"wbnixypynbfwmwucplmp"}

echo "📦 Deploying to project: $PROJECT_REF"

# Deploy all functions
echo "🔧 Deploying Edge Functions..."
supabase functions deploy --project-ref "$PROJECT_REF"

echo "✅ Deployment completed successfully!"
echo "🎉 Your Edge Functions are now live!"

# Optional: Show function URLs
echo ""
echo "📋 Function URLs:"
echo "- send-welcome-email: https://$PROJECT_REF.functions.supabase.co/send-welcome-email"

echo ""
echo "📊 Monitor your functions at:"
echo "https://supabase.com/dashboard/project/$PROJECT_REF/functions" 