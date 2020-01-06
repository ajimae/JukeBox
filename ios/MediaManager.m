//
//  MediaManager.m
//  QuinPod
//
//  Created by Chukwuemeka Ajima on 10/09/2019.
//  Copyright © 2019 Facebook. All rights reserved.
//

#import "MediaManager.h"
#import "AppDelegate.h"

@implementation MediaManager
RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;
@synthesize musicPlayer;

-(void)showMediaPicker {
  if(self.mediaPicker == nil) {
    self.mediaPicker = [[MPMediaPickerController alloc] initWithMediaTypes:MPMediaTypeAnyAudio];
    
    [self.mediaPicker setDelegate:self];
    [self.mediaPicker setAllowsPickingMultipleItems:NO];
    [self.mediaPicker setShowsCloudItems:NO];
    self.mediaPicker.prompt = @"Select song";
  }
  
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [delegate.window.rootViewController presentViewController:self.mediaPicker animated:YES completion:nil];
}

void hideMediaPicker() {
  AppDelegate *delegate = (AppDelegate *)[[UIApplication sharedApplication] delegate];
  [delegate.window.rootViewController dismissViewControllerAnimated:YES completion:nil];
}

-(void) mediaPicker:(MPMediaPickerController *)mediaPicker didPickMediaItems:(MPMediaItemCollection *)mediaItemCollection {
  MPMediaItem *mediaItem = mediaItemCollection.items[0];
  NSURL *assetUrl = [mediaItem valueForProperty:MPMediaItemPropertyAssetURL];
  
  [self.bridge.eventDispatcher sendAppEventWithName:@"Select song" body: [mediaItem valueForProperty:MPMediaItemPropertyTitle]];
  
  if(musicPlayer == nil) {
    musicPlayer = [MPMusicPlayerController systemMusicPlayer];
  }
  
  [musicPlayer setQueueWithItemCollection:mediaItemCollection];
  [musicPlayer play];
  
  hideMediaPicker();
}

-(void) mediaPickerDidCanel: (MPMediaPickerController *)mediaPicker {
  hideMediaPicker();
}

RCT_EXPORT_METHOD(showSongs) {
  [self showMediaPicker];
}

@end


