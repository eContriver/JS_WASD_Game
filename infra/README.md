Copyright (c) 2019-2020 eContriver LLC

# Docker Compose

Start IDEA with:

    docker-compose up

Build images with:

    docker-compose build

Run the IDE with:

    docker-compose run ide

Run bash with:

    docker-compose run bash

Take down all containers and remove any orphans from renames etc.

    docker-compose down --remove-orphans

# Prerequistes for cocos

Cocos2d Prerequisites - v3.17.2 - https://docs.cocos.com/cocos2d-x/manual/en/installation/prerequisites.html?h=ndk

* Mac OS X 10.13+, Xcode 10+
* Ubuntu 16.04+, CMake 3.1+ (use apt install to get the latest version)
* Windows 7+, VS 2017+
* Python 2.7.5+, Python 2,7.10 reccomended, NOT Python 3+
* NDK r91c+ is required to build Android games (tested with r19c) May be called 19.2.xx from within Android Studio
* Android Studio 3.4+ to build Android games (tested with 3.0)

# Old Flows

Changed OS to ubuntu:18.04

    docker build -t android_deps:0.1 -f Dockerfile-Studio-Deps .
    docker build -t android_studio:0.1 -f Dockerfile-Android-Studio . 
    docker build -t android_ndk:0.1 -f Dockerfile-Android-NDK .
    docker build -t android_cocos:0.1 -f Dockerfile-Studio-Cocos2d .

Setup Android Studio per:

* https://bitbucket.org/ncimino/beryllium/src/justplay/doc/docker_setup.md

docker container ls -a

docker commit fc64eafcab51 android_cocos:0.2

Then back to:

* https://bitbucket.org/ncimino/beryllium/src/justplay/doc/docker_setup.md

Start the docker image:

    docker run -it -v C:/Users/admin/:/root/admin --net=host -p 5555:5555 -e DISPLAY=192.168.2.110:0 android_cocos:0.2 bash

Start Android Studio:

    /opt/android-studio/bin/studio.sh

File > Project Structure > NDK: (correct?)

/opt/android-ndk-r19 > r13

Move "Build Test" up

Change to "regenerate wrapper and reimport"

HMMMM... Update gradle plugin and gradle version? 
> Yes: Update
Before doing this it looked like everything worked, but we had a warning

After doing this...same, so let's use the latest!

Not only that but changing this file:

* /opt/cocos2d-x-3.17.2/tests/cpp-tests/proj.android/app/build.gradle

from

    variant.mergeAssets.doLast {

to

    variant.mergeAssetsProvider.get().doLast {

fixed the warning

# Rebuild project

From here I closed the docker image which ran the tests, and re-started the 
image so it was in a clean state (without tests compiled and changed etc.)

    docker run -it -v C:/Users/admin/:/root/admin --net=host -p 5555:5555 -e DISPLAY=192.168.2.110:0 android_cocos:0.2 bash

Now let's setup Cocos2D on command line:

    export NDK_ROOT=/opt/android-ndk-r13/
    export ANDROID_SDK_ROOT=/root/Android/Sdk/
    /opt/cocos2d-x-3.17.2/setup.py
    source /root/.bashrc
    cocos -v

Looks good, let's create the project

    cd /root/admin
    git clone git@bitbucket.org:ncimino/beryllium.git
    cocos new Beryllium -p com.econtriver.beryllium -l cpp -d /root/admin/beryllium

Followed: Create a new Cocos2D-x Project (Migration if clone doesn't work)

Also add: gvimdiff {cocos2d-x,Beryllium}/proj.android/app/res/values/strings.xml

    $ /opt/android-studio/bin/studio.sh &

Import as dictated

    /root/admin/beryllium/cocos2d-x/proj.android


Wait for processing

> Project Structure > SDK Location > Android NDK Location

Just said 

    Error configuring

Modified:

* /root/admin/beryllium/cocos2d-x/proj.android/build.gradle

To:

    classpath 'com.android.tools.build:gradle:3.3.0'

Clicked on top-bar: 

> sync failed...Try Again

This caused:

    ERROR: Minimum supported Gradle version is 4.10.1. Current version is 4.6.

    Please fix the project's Gradle settings.
    Fix Gradle wrapper and re-import project
    Open Gradle wrapper properties
    Gradle settings

Clicked on:

> Fix Gradle wrapper and re-import project

Pop-up:

> To take advantage of the latest features, improvements, and security fixes, we strongly recommend that you update the Android Gradle plugin to version 3.4.2 and Gradle to version 5.1.1. Release notes  Android plugin 3.2.0 and higher now support building the Android App Bundle�a new upload format that defers APK generation and signing to compatible app stores, such as Google Play. With app bundles, you no longer have to build, sign, and manage multiple APKs, and users get smaller, more optimized downloads. Learn more

Clicked on "Update"

Clicked on "Sync Now"

On host machine:

    C:\Users\admin\Downloads\platform-tools_r28.0.3-windows\platform-tools\adb.exe tcpip 5555

On docker container, from Android Studio:

    ~/Android/Sdk/platform-tools/adb connect 192.168.1.128:5555


History

    git clone git@bitbucket.org:ncimino/beryllium.git
    cocos new Beryllium -p com.econtriver.beryllium -l cpp -d /root/admin/beryllium
    cd beryllium
    git status
    rm -rf Beryllium/
    mv ../beryllium.new_from_cocos/Beryllium/ .
    ls
    rm -rf ../beryllium.new_from_cocos/
    diff {cocos2d-x,Beryllium}/proj.android/app/AndroidManifest.xml
    git checkout justplay
    diff {cocos2d-x,Beryllium}/proj.android/app/AndroidManifest.xml
    vi {Beryllium}/proj.android/app/AndroidManifest.xml
    g {Beryllium}/proj.android/app/AndroidManifest.xml
    gvim {Beryllium}/proj.android/app/AndroidManifest.xml
    gvimdiff Beryllium/proj.android/app/AndroidManifest.xml
    gvimdiff {cocos2d-x,Beryllium}/proj.android/app/AndroidManifest.xml
    diff {cocos2d-x,Beryllium}/proj.android/app/jni/Android.mk
    gvimdiff {cocos2d-x,Beryllium}/proj.android/app/jni/Android.mk
    grep MyGame -r Beryllium/
    grep MyGame -r Beryllium/ -l
    grep MyGame -r Beryllium/ -l | xargs sed -i 's/MyGame/Beryllium/g' 
    grep MyGame -r Beryllium/ -l
    grep Beryllium -r Beryllium/ -l
    grep Beryllium -r Beryllium/ -
    grep Beryllium -r Beryllium/ 
    g Beryllium/CMakeLists.txt
    gvim Beryllium/CMakeLists.txt
    gvimdiff {cocos2d-x/,Beryllium/}CMakeLists.txt
    grep hellocpp -r Beryllium
    grep hellocpp -r Beryllium -l | xargs sed -i 's/hellocpp/beryllium/g' 
    cp -r cocos2d-x/Classes/* Beryllium/Classes/
    rm -f Beryllium/Classes/HelloWorldScene.*
    rm -rf Beryllium/Resources/*
    cp -r cocos2d-x/Resources/* Beryllium/Resources/
    mv Beryllium/proj.android/app/jni/{hellocpp,beryllium}/
    mv cocos2d-x{,.old}
    mv Beryllium cocos2d-x
    git status
    /opt/android-studio/bin/studio.sh &
    grep google_app_id -r cocos2d-x.old/
    ls cocos2d-x.old/proj.android/app/res/values/strings.xml
    ls cocos2d-x.old/proj.android/app/res/values/
    ls cocos2d-x/proj.android/app/res/values/
    gvimdiff cocos2d-x*/proj.android/app/res/values/strings.xml 
    grep HelloWorldScene -r cocos2d-x/
    gvim cocos2d-x/CMakeLists.txt
    gvim cocos2d-x/proj.android/app/.externalNativeBuild/cmake/debug/armeabi-v7a/android_gradle_generate_cmake_ninja_json_armeabi-v7a.stderr.txt
