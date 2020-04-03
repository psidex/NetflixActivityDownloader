import { getVarsFromReact } from './variables';
import { downloadActivity } from './api';

async function main() {
    const { shaktiActivityUrl, userInfo } = getVarsFromReact();
    const activity = await downloadActivity(shaktiActivityUrl);
    console.log(userInfo);
    console.log(activity);
}

main();
