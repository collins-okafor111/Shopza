# Shopza follow and WhatsApp changes

## Changes in this patch

- Follow status is now scoped to the currently authenticated Firebase UID.
- Follow/unfollow relationships are saved under `users/{uid}/following/{storeId}` in Firestore.
- The Follow button updates from a Firestore real-time listener rather than a shared `localStorage` list.
- The app blocks following your own store in the UI and in the follow action.
- A follow/unfollow action reports success only after its Firestore write succeeds.
- WhatsApp direct-order/contact buttons and seller theme controls have been removed from the supplied codebase. The in-app seller messaging flow remains available.
- Firestore rules now include owner-only read/create/delete permissions for a user's following subcollection.

## Required deployment step

Deploy the updated `firestore.rules` to the Firebase project used by Shopza. Without this, Firestore may reject follow/unfollow operations.

Before deploying rules, compare them with the rules currently deployed in Firebase Console and merge any newer rules from your live app. This ZIP was built from the source archive supplied in this conversation, which may not contain later edits made inside AI Studio.

## Follow behavior to test

1. Sign in as account B and follow account A's store.
2. Refresh the page: B should still see `Following`.
3. Sign in as account C: A's store should show `Follow` until C follows it.
4. Sign back in as B: it should show `Following` again.
5. Open your own store while signed in as its owner: the button should say `Your Store` and be disabled.
6. Unfollow from B and confirm only B's relationship is removed.

## Build verification

A production build could not be run in this environment because project dependencies were not installed; the dependency installation attempt timed out. Run `npm install` and then `npm run build` in AI Studio or your local development environment before deploying.
