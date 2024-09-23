'use client'

import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  DynamicContextProvider,
  type UserProfile,
} from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector'
import { createConfig, WagmiProvider } from 'wagmi'
import { http } from 'viem'
import { mainnet, sepolia } from 'viem/chains'
import { useRouter } from 'next/navigation'

const config = createConfig({
  chains: [sepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

const queryClient = new QueryClient()

export default function OnchainProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  const handlers = {
    handleAuthenticatedUser: async ({ user }: { user: UserProfile }) => {
      console.log('handleAuthenticatedUser was called', user)

      router.push('/cartera')
      // if (!user.userId) {
      //   toast.error('something went wrong, please try again later')
      // }

      // // handle GET /api/user call > get or create user
      // const existingUser = api.users.getById.useQuery({ id: user.userId ?? '' })
      // console.log(existingUser.data)
      // // const existingUser = await api.users.getById({ id: user.userId ?? '' })

      // if (!existingUser) {
      //   router.push('/u/create')
      // } else {
      //   router.push('/u')
      // }
    },
  }

  return (
    <DynamicContextProvider
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID ?? 'ENV_ID',
        handlers,
        siweStatement:
          'Bienvenido a tu cuenta sustantiva. Firma el mensaje para comprobar que eres el dueño de la cartera. Esta operación no tiene costo y no genera ninguna transacción',
        walletConnectors: [EthereumWalletConnectors],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  )
}
