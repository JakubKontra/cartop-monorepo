/**
 * Cache Revalidation API Route
 *
 * Called by backend's Watch decorator when catalog data changes
 * Triggers Next.js ISR revalidation for affected pages
 */

import type { NextRequest } from 'next/server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

// Secret token for webhook security (should match backend CACHE_INVALIDATION_SECRET)
const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'dev-secret-change-in-production';

export async function POST(request: NextRequest) {
  try {
    // Verify secret token
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (token !== REVALIDATION_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse webhook payload
    const body = await request.json();
    const { action, data, entityName } = body;

    console.warn(`[Revalidation] Received webhook: ${entityName} - ${action}`, data);

    // Revalidate based on entity type
    switch (entityName) {
      case 'catalog_brands':
        // Revalidate all brand-related pages
        revalidatePath('/brands');
        revalidateTag('brands');

        // Revalidate specific brand page if slug is provided
        if (data?.slug) {
          revalidatePath(`/brands/${data.slug}`);
          revalidateTag(`brand-${data.slug}`);
        }

        console.warn(`[Revalidation] Revalidated brand pages`);
        break;

      case 'CatalogColor':
        revalidatePath('/colors');
        revalidateTag('colors');
        console.warn(`[Revalidation] Revalidated color pages`);
        break;

      default:
        console.warn(`[Revalidation] Unknown entity type: ${entityName}`);
        return NextResponse.json({ error: `Unknown entity type: ${entityName}` }, { status: 400 });
    }

    return NextResponse.json({
      action,
      entityName,
      revalidated: true,
      success: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.warn('[Revalidation] Error:', error);

    return NextResponse.json(
      {
        error: 'Revalidation failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

export function GET() {
  return NextResponse.json({
    description: 'Cache revalidation webhook endpoint',
    endpoint: '/api/revalidate',
    method: 'POST',
    status: 'ok',
    usage: 'Send POST with Authorization header and entity/action payload',
  });
}
