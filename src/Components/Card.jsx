import {
    Heading,
    Avatar,
    Box,
    Center,
    Text,
 
    Link,

    useColorModeValue,
  } from '@chakra-ui/react';

  
  export const Card=({name,email,pic,bio,isPublic})=> {
   
    return (
      <Center py={6}>
        <Box
          maxW={'320px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.900')}
          boxShadow={'2xl'}
          rounded={'lg'}
          p={6}
          textAlign={'center'}>

          <Avatar
            size={'xl'}
            
            src={
                pic||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUTeRGHMEYk-cAyDx6dzQjmtdemQ6miEisUg&s'
            }
            alt={'Avatar Alt'}
            mb={4}
            pos={'relative'}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: 'green.300',
              border: '2px solid white',
              rounded: 'full',
              pos: 'absolute',
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={'2xl'} fontFamily={'body'}>
            {name}
          </Heading>
          
          <Text
            textAlign={'center'}
            color={useColorModeValue('gray.700', 'gray.400')}
            px={3}>
         {bio}
          </Text>
  
         { isPublic?<Link href={'#'} color={'blue.400'}>
              Public
            </Link>:<Link href={'#'} color={'red.400'}>
              Private
            </Link> }
  
          
        </Box>
      </Center>
    );
  }