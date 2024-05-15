import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  IconButton,
  Center,
  AvatarBadge,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { profileUpload, updateUser } from '../actions/action';

export const Profile = () => {
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state?.user?.currentUser);

  const [userProfile, setUserProfile] = useState({
    userName: getUser.userName,
    email: getUser.email,
    password: '',
    isPublic: getUser.isPublic,
    profilePicture: getUser.profile,
    mobileNo: getUser.mobileNo,
    bio: getUser.bio,
  });

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    const response = await profileUpload(file, dispatch);
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      profilePic: response,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedProfile = { ...userProfile };
    if ('isPublic' in updatedProfile) {
      updatedProfile.isPublic = userProfile.isPublic === 'true'; // Convert string value to boolean
    }

    await updateUser(getUser.id || getUser._id, updatedProfile, dispatch);
    alert('Profile updated successfully');
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        as="form"
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
        onSubmit={handleSubmit}>
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          User Profile Edit
        </Heading>

        <FormControl id="profilePicture">
          <FormLabel>Profile Picture</FormLabel>
          <Center>
            <Avatar size="xl" src={getUser.profilePic || 'https://bit.ly/sage-adebayo'}>
              <AvatarBadge
                as={IconButton}
                size="sm"
                rounded="full"
                top="-10px"
                colorScheme="red"
                aria-label="Remove Image"
                icon={<CloseIcon />}
              />
            </Avatar>
          </Center>
          <Input type="file" accept="image/*" onChange={handleProfilePictureChange} />
        </FormControl>

        <FormControl id="isPublic" isRequired>
          <FormLabel>Public Profile</FormLabel>
          <RadioGroup defaultValue={userProfile.isPublic?"true":"false"} onChange={(value) => setUserProfile((prev) => ({ ...prev, isPublic: value }))}>
            <Stack direction={['column', 'row']} spacing={6}>
              <Radio name="isPublic" value="true">
                Yes
              </Radio>
              <Radio name="isPublic" value="false">
                No
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl id="userName" >
          <FormLabel>User Name</FormLabel>
          <Input
            name="userName"
            value={userProfile.userName}
            onChange={(e) => setUserProfile((prev) => ({ ...prev, userName: e.target.value }))}
            placeholder="User Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="mobile" >
          <FormLabel>mobile No</FormLabel>
          <Input
            name="mobileNo"
            value={userProfile.mobileNo}
            onChange={(e) => setUserProfile((prev) => ({ ...prev, mobileNo: e.target.value }))}
            placeholder="mobileno"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="bio" >
          <FormLabel>bio</FormLabel>
          <Input
            name="mobileNo"
            value={userProfile.bio}
            onChange={(e) => setUserProfile((prev) => ({ ...prev, bio: e.target.value }))}
            placeholder="bio"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>

        <FormControl id="email" >
          <FormLabel>Email Address</FormLabel>
          <Input
            name="email"
            value={userProfile.email}
            onChange={(e) => setUserProfile((prev) => ({ ...prev, email: e.target.value }))}
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={userProfile.password}
            onChange={(e) => setUserProfile((prev) => ({ ...prev, password: e.target.value }))}
            placeholder="Password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>

        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
            onClick={() => console.log('Cancel clicked')}>
            Cancel
          </Button>
          <Button
            type="submit"
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
