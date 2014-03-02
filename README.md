### ProductionSafe

A simple Chrome extension that allows developers to inject warning banners into their production sites. Often times staging and production sites
can be very similar. If a developer is not careful he/she might modify the wrong server -- it's happened before. ProductionSafe is a safe solution that
injects a giant red banner that's impossible to miss directly on the page. The banner can be easily dismissed by clicking it or disabling the banners within
the popup menu.

### How to install

To install ProductionSafe simply head over to the <a href="https://github.com/mcross1882/ProductionSafe/releases">releases</a> page and grab the latest download. 
One you've downloaded the extension just drag and drop the icon over to Chrome which will produce a dialog asking if you would like to install the extension. 
After you finish going through the dialog a small stop sign icon will appear in the toolbar.

You can now add, remove or edit sites by using the popup menu. Sites that you add to the list will have the banners injected when you visit those pages. The search 
term or site url is matched "broadly" so if you use a value like `google` it will blacklist any site with word google in its url.
