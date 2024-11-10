"use client";
import { Box, Grid } from "@chakra-ui/react";
import styles from "./page.module.css";
import SendTransaction from "./components/SendTransaction";
import { contractAbi } from "./contracts/contractAbi";
import { useState, useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";
import connector from "./components/connector";

// Contract address
const contractAddress =
  "0x05a7ee0a287951464bcdfaa8c25194714f458106a0af16339723ce0a2ab36fad";

const sepoliaAddress = "0x07d08c25f35091012463841369755f0547bc3f3d9fb72df0112ae6461ef75073"

function Home() {
  const [controller, setController] = useState(null);
  const [account, setAccount] = useState(null);
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const [username, setUsername] = useState(" ");

  useEffect(() => {
    if (!address) return;
    connector.username()?.then((n) => setUsername(n));
  }, [address, connector]);

  useEffect(() => {
    // Initialize Cartridge Controller
    const initController = async () => {
      const connectedAccount = await connector.connect();
      setController(connector);
      setAccount(connectedAccount);
    };

    initController();
  }, []);

  

  const connectWallet = async () => {
    // if (controller) {
    //   const connectedAccount = await controller.connect();
    //   setAccount(connectedAccount);
    // }
    const connectedAccount = await connector.connect();
    setAccount(connectedAccount);
  };

  const disconnectWallet = () => {
    setAccount(null);
    // Add any additional logic needed to disconnect
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div className={styles.logoContainer}>
          <span>Autonomous Audio</span>
        </div>

        {address && (
          <>
            <p>Account: {address.slice(0, 5)}...{address.slice(-4)} </p>
            {username && <p>Username: {username}</p>}
          </>
        )}

        <button
        className={styles.connectbtn}
          onClick={() => {
            address ? disconnect() : connect({ connector });
          }}
        >
          {address ? "Disconnect" : "Connect"}
        </button>
      </div>

      <div className={styles.center}></div>

      {/* Buttons Grid Section */}
      <Box
        className={styles.buttonsContainer}
        bg="gray.100"
        color="black"
        borderWidth="1px"
        borderRadius="md"
        paddingBottom="6px"
      >
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={24}
          mt={0}
          p={14}
          bg="gray.300"
          borderRadius="md"
        >
          <SendTransaction
            amount={1}
            contractAddress={sepoliaAddress}
            abi={contractAbi}
            buttonLabel="Sparkle"
          />
          <SendTransaction
            amount={2}
            contractAddress={contractAddress}
            abi={contractAbi}
            buttonLabel="Accelerandos"
          />
          <SendTransaction
            amount={3}
            contractAddress={contractAddress}
            abi={contractAbi}
            buttonLabel="Crackle"
          />
          <SendTransaction
            amount={4}
            contractAddress={contractAddress}
            abi={contractAbi}
            buttonLabel="Melody"
          />
          <SendTransaction
            amount={5}
            contractAddress={contractAddress}
            abi={contractAbi}
            buttonLabel="Boom"
          />
          <SendTransaction
            amount={6}
            contractAddress={contractAddress}
            abi={contractAbi}
            buttonLabel="Drone"
          />
          <SendTransaction
            amount={7}
            contractAddress={contractAddress}
            abi={contractAbi}
            buttonLabel="Chords"
          />
          <SendTransaction
            amount={8}
            contractAddress={contractAddress}
            abi={contractAbi}
            buttonLabel="Percussive"
          />
          <SendTransaction
            amount={9}
            contractAddress={contractAddress}
            abi={contractAbi}
            buttonLabel="Change Chords"
          />
        </Grid>
      </Box>
    </main>
  );
}

export default Home;
