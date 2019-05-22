import { loadWatcher } from './queues/watch-pods';
import { loadBuildWatcher } from './queues/watch-build';

loadWatcher();
loadBuildWatcher();
