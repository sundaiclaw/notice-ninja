import 'dotenv/config';

import { createApp } from './app';
import { getPort } from './lib/env';

const port = getPort();
const app = createApp();

app.listen(port, () => {
  console.log(`Notice Ninja server listening on ${port}`);
});
