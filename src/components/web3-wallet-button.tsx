"use client"

// react
import { FC, useState } from "react"
// imports
import { useWeb3Modal } from "@web3modal/react"
import { RefreshCw } from "lucide-react"
import { useAccount, useDisconnect } from "wagmi"

// ui
import { Button, ButtonProps } from "./ui/button"

const Web3WalletButton: FC<ButtonProps> = ({
  type = "button",
  children = "Connect Wallet",
  ...props
}) => {
  const [isLoading, setLoading] = useState(false)
  const { open, isOpen } = useWeb3Modal()
  const { isConnected  } = useAccount()
  const { disconnect, reset } = useDisconnect()

  const label = isConnected ? "Disconnect" : children

  async function onOpen() {
    setLoading(true)
    await open()
    setLoading(false)
  }

  function handleclick() {
    if (isConnected) {
      reset()
      disconnect()
    } else {
      onOpen()
    }
  }

  return (
    <Button
      type={type}
      onClick={handleclick}
      disabled={isLoading || isOpen}
      {...props}
    >
      {isLoading || isOpen ? (
        <>
          <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> Connecting...
        </>
      ) : (
        label
      )}
    </Button>
  )
}

export default Web3WalletButton
