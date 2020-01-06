/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <AVFoundation/AVFoundation.h>
UIBackgroundTaskIdentifier _bgTaskId;

//#if RCT_DEV
//#import <React/RCTDevLoadingView.h>
//#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

//  RCTBridge *bridge = [[RCTBridge alloc] initWithBundleURL:jsCodeLocation
//                                            moduleProvider:nil
//                                             launchOptions:launchOptions];
//#if RCT_DEV
//  [bridge moduleForClass:[RCTDevLoadingView class]];
//#endif

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  [[AVAudioSession sharedInstance] setCategory:AVAudioSessionCategoryAmbient error:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"QuinPod"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

// The below line of code enables RNVideo background play
-(void)applicationWillResignActive:(UIApplication *)application
{
  //开启后台处理多媒体事件
  [[UIApplication sharedApplication] beginReceivingRemoteControlEvents];
  AVAudioSession *session=[AVAudioSession sharedInstance];
  [session setActive:YES error:nil];
  //后台播放
  [session setCategory:AVAudioSessionCategoryPlayback error:nil];
  //这样做，可以在按home键进入后台后 ，播放一段时间，几分钟吧。但是不能持续播放网络歌曲，若需要持续播放网络歌曲，还需要申请后台任务id，具体做法是：
  _bgTaskId=[AppDelegate backgroundPlayerID:_bgTaskId];
  //其中的_bgTaskId是后台任务UIBackgroundTaskIdentifier _bgTaskId;在appdelegate.m中定义的全局变量
}

+(UIBackgroundTaskIdentifier)backgroundPlayerID:(UIBackgroundTaskIdentifier)backTaskId
{
  //设置并激活音频会话类别
  AVAudioSession *session=[AVAudioSession sharedInstance];
  [session setCategory:AVAudioSessionCategoryPlayback error:nil];
  [session setActive:YES error:nil];
  //允许应用程序接收远程控制
  [[UIApplication sharedApplication] beginReceivingRemoteControlEvents];
  //设置后台任务ID
  UIBackgroundTaskIdentifier newTaskId=UIBackgroundTaskInvalid;
  newTaskId=[[UIApplication sharedApplication] beginBackgroundTaskWithExpirationHandler:nil];
  if(newTaskId!=UIBackgroundTaskInvalid&&backTaskId!=UIBackgroundTaskInvalid)
  {
    [[UIApplication sharedApplication] endBackgroundTask:backTaskId];
  }
  return newTaskId;
}

@end
