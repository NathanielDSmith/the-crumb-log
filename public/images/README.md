# Bread Images

Place your AI-generated bread images here.

## How to Update Images

**All image configuration is centralized in `/data/images.ts`**

To replace or update images:

1. **Add your new image file** to this folder (`/public/images/`)
   - Use any filename you want (e.g., `my-brioche-v2.jpg`, `brioche-final.png`)

2. **Update the filename in `/data/images.ts`**
   ```typescript
   export const breadImages: Record<string, string> = {
     'brioche': 'my-brioche-v2.jpg',  // ← Just change the filename here
     'sliced-white': 'sliced-white.jpg',
     // ... etc
   }
   ```

3. **That's it!** The image will automatically update across the entire site.

## Current Image Mappings

See `/data/images.ts` for the current filename mappings. Each bread ID maps to a filename in this folder.

## Image Specifications
- Recommended size: 1200x800px or larger
- Format: JPG, PNG, or WebP
- Aspect ratio: 3:2 or 4:3 works well
- File size: Keep under 500KB for web performance

## Adding New Breads

When adding a new bread type:
1. Add the image file to this folder
2. Add the mapping to `breadImages` in `/data/images.ts`
3. The image will automatically be used

