import React, { useEffect, useState } from 'react';
import {
  Flex,
  Stack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAction } from '../actions/action';
import {  useNavigate } from 'react-router-dom';

export const Login = () => {
  const initialFormData = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const isLoading=useSelector((state)=>state?.user?.loading);
  const isUserLoggedIn=useSelector((state)=>state?.user?.currentUser);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can access formData.email and formData.password
    const {email,password}=formData
    if(!email || !password){
        alert("Please enter email and password")
        return;
    }
    const payload={
        email,
        password
    }
    await LoginAction(payload,dispatch);
    // Add your form submission logic here
  };
  useEffect(()=>{
    if(isUserLoggedIn){
       navigate("/")
    }
      
  })

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
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          User Login
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            name="email"
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            type="submit"
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',

            }}
            isLoading={isLoading}
            >
            Submit
          </Button>
        </Stack>
      <Text>Don't have account? <span style={{color:"blue"}} onClick={()=>navigate("/register")}>Register</span></Text>
      </Stack>
    </Flex>
  );
};

