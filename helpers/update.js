import * as Updates from 'expo-updates';

async function checkUpdate() {
  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      await Updates.reloadFromCache();
    }
  } catch (e) {
    console.info(`Error checkUpdate: ${e.toString()}`);
  }
}

export default checkUpdate;
