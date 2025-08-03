## How it works?

Take a look at original PR:
https://github.com/rango-exchange/rango-client/pull/601


## Usage

log your messages using:
```
@nikaru-dev/logging-core
```

Listen to you logs (only on clients):
```json
    "@nikaru-dev/logging-subscriber": "0.1.0",
    "@nikaru-dev/logging-console": "0.1.0",
```

and 

```js
import { init, Level } from '@nikaru-dev/logging-subscriber';
import { layer as consoleLayer } from '@nikaru-dev/logging-console';

init([consoleLayer()], {
    baseLevel: Level.Trace,
});

```