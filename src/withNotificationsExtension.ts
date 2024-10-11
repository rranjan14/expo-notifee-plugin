import { ConfigPlugin, withPlugins } from '@expo/config-plugins';

import {
  withAppEntitlements,
  withEasAppExtension,
  withExtensionEntitlements,
  withExtensionInfoPlist,
  withExtensionViewController,
  withNotifeeCorePod,
  withSounds,
  withXcodeTarget,
} from './helper-plugins';
import { TExpoNotifeeRemote } from './types';

const initialParams: TExpoNotifeeRemote = {
  appGroups: [],
  developmentTeam: '',
  soundFiles: [],
  soundFilesPath: 'assets',
};

const withNotificationsExtension: ConfigPlugin<TExpoNotifeeRemote> = (config, params = initialParams) => {
  const { appGroups, developmentTeam, soundFiles = [], soundFilesPath = 'assets' } = params;

  if (!developmentTeam) {
    throw new Error('### NotifeeRemoteExtension Plugin Error: You need to provide Development Team');
  }

  const guardedParams: TExpoNotifeeRemote = {
    appGroups,
    developmentTeam,
    soundFilesPath,
    soundFiles,
  };

  return withPlugins(config, [
    // IOS
    [withAppEntitlements, guardedParams],
    [withEasAppExtension, guardedParams],
    [withExtensionEntitlements, guardedParams],
    [withExtensionInfoPlist, guardedParams],
    [withExtensionViewController, guardedParams],
    [withNotifeeCorePod, guardedParams],
    [withSounds, guardedParams],
    [withXcodeTarget, guardedParams],
  ]);
};

export default withNotificationsExtension;
