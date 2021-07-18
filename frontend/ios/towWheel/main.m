#import <UIKit/UIKit.h>

#import "AppDelegate.h"

int main(int argc, char * argv[]) {
  Cycle in dependencies between targets 'React-RCTText' and 'React'; building could produce unreliable results.
  Cycle path: React-RCTText  react-native-geolocation-service  React  React-RCTText
  Cycle details:
  Target 'React-RCTText': Libtool /Users/pavel/Library/Developer/Xcode/DerivedData/TowWheel-gqozmbzdsmanvxdvnbydimjxhoam/Build/Products/Debug-iphonesimulator/React-RCTText/libReact-RCTText.a normal
  Target 'React-RCTText' has compile command with input '/Users/pavel/Desktop/TowWheel/towheel/frontend/node_modules/react-native/Libraries/Text/VirtualText/RCTVirtualTextViewManager.m'
  Target 'react-native-geolocation-service'
  Target 'React' has target dependency on Target 'React-RCTText'
  Target 'React-RCTText' has compile command with input '/Users/pavel/Desktop/TowWheel/towheel/frontend/node_modules/react-native/Libraries/Text/Text/NSTextStorage+FontScaling.m'
  @autoreleasepool {
    return UIApplicationMain(argc, argv, nil, NSStringFromClass([AppDelegate class]));
  }
}
