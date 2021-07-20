// In renderer process (web page).
import { ipcRenderer } from 'electron';
import { MessageType } from './constants';

const syncReply = ipcRenderer.sendSync(MessageType.someSyncMessage, 'synchronous message from renderer');
console.log(syncReply); // eslint-disable-line no-console

ipcRenderer.on(MessageType.someAsyncReply, (event, arg) => console.log(arg)); // eslint-disable-line no-console
ipcRenderer.send(MessageType.someAsyncMessage, 'Async message from renderer');
