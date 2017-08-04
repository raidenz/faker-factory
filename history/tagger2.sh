#!/bin/bash

#get highest tag number
VERSION=`git describe --abbrev=0 --tags`

# get version from node
# PACKAGE_VERSION=$(node -p -e "require('./package.json').version")

#replace . with space so can split into an array
VERSION_BITS=(${VERSION//./ })

#get number parts and increase last one by 1
VNUM1=${VERSION_BITS[0]}
VNUM2=${VERSION_BITS[1]}
VNUM3=${VERSION_BITS[2]}


# input, do we need input??
# read NUM
# param ($1, $2)
echo "So what you gonna Do Master?"
echo "============================"
echo "1 Create Major Tags"
echo "2 Create Minor Tags"
echo "3 Create Patch Tags"
echo "============================"
read NUM


# read compatible server input
echo "Tell me what server version Compatible with this tags?"
read SER

if [ "$SER" == '' ]
then
    echo "No joke Please!"
    exit 0
fi

# | sed 's/\v//g' -->remove v
# | sed 's/-[0-9].*//'
case $NUM in
	1)
		echo "major"
		VNUM1=$(echo $VNUM1 | cut -c 2-)
		VNUM1=$((VNUM1+1))
		NEW_TAG="v$VNUM1.0.0"
	;;
	2)
		echo "minor"
		VNUM2=$((VNUM2+1))
		NEW_TAG="$VNUM1.$VNUM2.0"
	;;
	3)
		echo "patch"
		VNUM3=$((VNUM3+1))
		NEW_TAG="$VNUM1.$VNUM2.$VNUM3"
	;;
	*)
		NEW_TAG="$VNUM1.$VNUM2.$VNUM3"
		echo "Input Invalid, insert major, minor, or patch!"
		exit 0
	;;
esac

echo "Updating $VERSION to $NEW_TAG"
echo "tag $NEW_TAG compatible to server version $SER"
echo "Continue Master? y/n"
read CON
case $CON in
	y)
		echo "Updating"
	;;
	Y)
		echo "Updating"
	;;
	*)
		echo "Abort"
		exit 0
	;;
esac

#create new tag
echo "Updating $VERSION to $NEW_TAG"
echo "it will create compatible file $NEW_TAG to server $SER"


# git log --oneline $VERSION..$NEW_TAG > $NEW_TAG

# #get current hash and see if it already has a tag
GIT_COMMIT=`git rev-parse HEAD`
NEEDS_TAG=`git describe --contains $GIT_COMMIT`

# echo "$NEEDS_TAG"

# #only tag if no tag already (would be better if the git describe command above could have a silent option)
if [ -z "$NEEDS_TAG" ]; then
    echo "Tagged with $NEW_TAG (Ignoring fatal:cannot describe - this means commit is untagged) "
    # git tag $NEW_TAG
    # git push --tags

	# preparation
	# m hiraq code
	echo "$NEW_TAG" > VERSION.TXT
	echo "$NEW_TAG > $SER" >> DEPENDENCIES.TXT
	git add .
	git commit -m "Bump version: $NEW_TAG"

	# update changelogs
	git log --oneline $VERSION..$NEW_TAG > ./history/$NEW_TAG

	git add .
	git commit -m "Changelog: $NEW_TAG"
	git tag -fa $NEW_TAG

	# git push --tags

else
    echo "Already a tag on this commit"
fi



#
# Note:
# Add Shell Parameter Logic
# Major, Minor, Patch
# Major = x+1.0.0
# Minor = x.x+1.0
# Patch = x.x.x+1
# watch param
# if param = major
# 	VNUM1=$((VNUM1+1))
# 	NEW_TAG="$VNUM1.0.0"
# if param = minor
# 	VNUM2=$((VNUM2+1))
# 	NEW_TAG="$VNUM1.VNUM2.0"
# if param = patch
# 	VNUM3=$((VNUM3+1))
# 	NEW_TAG="$VNUM1.$VNUM2.$VNUM3"
#
# =============================================
# partial from m hiraq code
# warn: take the git code
# basic write file command
# 	echo "some data for the file" >> fileName
# 	remove the echo while the coomand is right
#
# echo('git tag -a $NEW_TAG -m "Release version: $NEW_TAG"')
# echo('echo $NEW_TAG > VERSION.txt')
# echo('git add .')
# echo('git commit -m "Bump version: $NEW_TAG"')

# update changelogs
# 	echo('git log --oneline $VERSION..$NEW_TAG > $NEW_TAG')

# echo('git add .')
# echo('git commit -m "Changelog: $NEW_TAG"')
# echo('git tag -fa $NEW_TAG')
# =============================================
#
#
#