# baasatrakuza-promise
## Usage
### Install

```
npm i baasatrakuza-promise
```

### Examples

```javascript
import RKZClientPromise from 'baasatrakuza-promise';

document.addEventListener('deviceready', () => {
  RKZClientPromise.polyfill();

  RKZClient.setTenantKey(process.env.TENANT_KEY).then(() => {
    alert('success!!');
  }).catch((error) => {
    console.error(error);
  });
}, false);
```
