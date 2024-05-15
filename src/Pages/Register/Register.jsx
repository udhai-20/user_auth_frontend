import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  RadioGroup,
  Radio,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterAction } from '../actions/action';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const isLoading=useSelector((state)=>state?.user?.loading);
    const isUserLoggedIn=useSelector((state)=>state?.user?.currentUser);
  const [formData, setFormData] = useState({
    userType: 'user',
    userName: '',
    email: '',
    password: '',
  });

  const handleChange = (newValue) => {
    setFormData({
      ...formData,
      userType: newValue,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you can handle form submission with formData
    if (!formData.userName || !formData.email || !formData.password) {
      alert('Please enter all required fields');
      return;
    }
    await RegisterAction(formData,dispatch);
    return navigate("/login")
    // Example: Send formData to backend API for registration
  };

  useEffect(()=>{
    if(isUserLoggedIn){
       navigate("/")
    }
    
    
    // eslint-disable-next-line 
  },[isUserLoggedIn])


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
          User Registration
        </Heading>
        <FormControl id="userType" isRequired>
          <FormLabel>User Type</FormLabel>
          <RadioGroup value={formData.userType} onChange={handleChange}>
            <Stack direction={['column', 'row']} spacing={6}>
              <Radio value="USER">User</Radio>
              <Radio value="ADMIN">Admin</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>User Name</FormLabel>
          <Input
            name="userName"
            value={formData.userName}
            onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
            placeholder="User Name"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Button
          type="submit"
          bg={'blue.400'}
          color={'white'}
          w="full"
          _hover={{
            bg: 'blue.500',
          }}
          isLoading={isLoading}>
          Submit
        </Button>
      </Stack>
    </Flex>
  );
};
