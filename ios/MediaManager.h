//
//  MediaManager.h
//  QuinPod
//
//  Created by Chukwuemeka Ajima on 10/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <MediaPlayer/MediaPlayer.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventDispatcher.h"

@interface MediaManager : NSObject<RCTBridgeModule, MPMediaPickerControllerDelegate>

@property (nonatomic, retain) MPMediaPickerController *mediaPicker;
@property (nonatomic, retain) MPMusicPlayerController *musicPlayer;

@end


