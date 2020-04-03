import { getVarsFromReact } from './variables.js';
import { downloadActivity } from './api.js';

async function main() {
    const { shaktiActivityUrl, userInfo } = getVarsFromReact();
    const activity = await downloadActivity(shaktiActivityUrl);
    console.log(userInfo);
    console.log(activity);
}

main();
