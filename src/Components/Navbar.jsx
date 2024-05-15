import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
 
  useDisclosure,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAction } from '../Pages/actions/action';

// const Links = ['Projects']



export default function NavBar() {
  const dispatch=useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {currentUser}=useSelector((state)=>state?.user)
  const navigate=useNavigate();
  const handleProfileEdit=()=>{
      console.log(currentUser);
      if(currentUser){
          navigate(`/profile/${currentUser?.id || currentUser?._id}`)
      }

  }

  const handleLogout=async()=>{
    await logoutAction(dispatch)

  }

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box onClick={()=>navigate('/')}>Home</Box>
            
          </HStack>
          {currentUser?<Flex alignItems={'center'}>
            <Menu >
              <MenuButton
              onClick={handleProfileEdit}
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUTeRGHMEYk-cAyDx6dzQjmtdemQ6miEisUg&s'
                  }
                />
              </MenuButton>
              
            </Menu>
          </Flex>:
           <Text onClick={()=>navigate('/login')} >Login</Text>}

           {
            currentUser&&
            <Text onClick={handleLogout} >Logout</Text>
           }

        </Flex>

        {/* {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null} */}
      </Box>

      {/* <Box p={4}>Main Content Here</Box> */}
    </>
  );
}