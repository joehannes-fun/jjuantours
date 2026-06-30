import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { MdHome, MdTour, MdLocalTaxi, MdEmail, MdLibraryBooks } from 'react-icons/md';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useBreakpointValue,
  Stack,
  Image,
  Heading,
} from '@chakra-ui/react';
import LanguageSwitcher from '../LanguageSwitcher';
import { useBrand } from '../../contexts/BrandContext';

const navItems = [
  { id: 'nav.home', path: '/#top', icon: MdHome },
  { id: 'nav.tours', path: '/tours#top', icon: MdTour },
  { id: 'nav.transport', path: '/transport#top', icon: MdLocalTaxi, default: 'Transport' },
  { id: 'nav.blog', path: '/blog#top', icon: MdLibraryBooks, default: 'Blog' },
  { id: 'nav.contact', path: '/contact#top', icon: MdEmail },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { brandSettings } = useBrand();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={50}
      borderBottom="1px solid"
      borderColor="whiteAlpha.200"
      bg="rgba(15, 23, 42, 0.7)"
      backdropFilter="blur(20px)"
      boxShadow="0 8px 32px rgba(0,0,0,0.3)"
    >
      <Flex
        align="center"
        justify="space-between"
        py={4}
        px={{ base: 4, lg: 8 }}
        maxW="80rem"
        mx="auto"
      >
        <Link to="/#top">
          <HStack spacing={3}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Box
                position={{ base: "fixed", lg: "relative" }}
                left={{ base: "1rem", lg: "auto" }}
                top={{ base: "0.5rem", lg: "auto" }}
                h={{ base: "6rem", md: "6.5rem" }}
                w={{ base: "6rem", md: "6.5rem" }}
                borderRadius="full"
                bgGradient="linear(to-br, whiteAlpha.800, cyan.50)"
                boxShadow="0 0 30px rgba(249, 115, 22, 0.95), 0 0 60px rgba(249, 115, 22, 0.6)"
                ring="1px"
                ringColor="whiteAlpha.400"
                overflow="hidden"
                backdropFilter="blur(12px)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {brandSettings.brandicon ? (
                  <Image src={brandSettings.brandicon} alt="Logo" h="full" w="full" objectFit="cover" />
                ) : (
                  <Image src="/competitor-logo.svg" alt="Logo" h="5.25rem" w="5.25rem" />
                )}
              </Box>
            </motion.div>
            
            <Heading
              as="h1"
              fontSize={{ base: "xl", sm: "2xl" }}
              fontWeight="bold"
              color="white"
              ml={{ base: "7rem", sm: "7.5rem", lg: "8rem" }}
              display={{ base: "none", sm: "block" }}
              position="relative"
              _hover={{ color: "teal.300" }}
              transition="color 0.3s"
            >
              {brandSettings.brandName}
              <Box
                position="absolute"
                inset={0}
                bgGradient="linear(to-r, orange.300/30, orange.400/20, amber.300/30)"
                borderRadius="lg"
                blur="sm"
                opacity={0.6}
                _groupHover={{ opacity: 0.8 }}
                transition="opacity 0.3s"
              />
            </Heading>
          </HStack>
        </Link>

        <IconButton
          as={motion.button}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.1, rotate: isMenuOpen ? 0 : 90 }}
          h={11}
          w={11}
          borderRadius="full"
          bg="whiteAlpha.600"
          color="slate.800"
          ring="1px"
          ringColor="whiteAlpha.500"
          backdropFilter="blur(12px)"
          aria-label="Toggle navigation"
          icon={isMenuOpen ? <HiX boxSize={8} /> : <HiMenu boxSize={8} />}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          display={{ md: "none" }}
          _hover={{ bg: "whiteAlpha.800" }}
          transition="all 0.2s"
        />

        <AnimatePresence>
          {(isMenuOpen || !isMobile) && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={3}
                align="center"
                gap={3}
                display={{ base: isMenuOpen ? "flex" : "none", md: "flex" }}
                position={{ base: "absolute", md: "relative" }}
                left={{ base: 3, md: "auto" }}
                right={{ base: 3, md: "auto" }}
                top={{ base: "calc(100% + 10px)", md: "auto" }}
                flexDir={{ base: "column", md: "row" }}
                borderRadius={{ base: "28px", md: "none" }}
                border={{ base: "1px solid", md: "none" }}
                borderColor={{ base: "whiteAlpha.400", md: "transparent" }}
                bg={{ base: "whiteAlpha.300", md: "transparent" }}
                px={{ base: 6, md: 0 }}
                py={{ base: 6, md: 0 }}
                boxShadow={{ base: "0 16px 48px rgba(8,42,62,.16)", md: "none" }}
                backdropFilter={{ base: "blur(12px)", md: "none" }}
              >
                {navItems.map((item) => (
                  <Link key={item.id} to={item.path} onClick={() => setIsMenuOpen(false)}>
                    <Button
                      as={motion.button}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      variant="ghost"
                      colorScheme="whiteAlpha"
                      leftIcon={<item.icon />}
                      fontWeight="semibold"
                      color="slate.200"
                      _hover={{ bg: "cyan.50", color: "cyan.700" }}
                      borderRadius="full"
                      px={3}
                      py={2}
                    >
                      <FormattedMessage id={item.id} defaultMessage={item.default} />
                    </Button>
                  </Link>
                ))}
                <LanguageSwitcher />
              </Stack>
            </motion.nav>
          )}
        </AnimatePresence>
      </Flex>
    </Box>
  );
};

export default Header;
