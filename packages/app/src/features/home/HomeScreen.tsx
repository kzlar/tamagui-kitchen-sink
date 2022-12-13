import {Anchor, Button, H1, Heading, LmButton, Paragraph, Separator, TextProps, useDidFinishSSR, XStack, YStack} from 'tamagui-extras'
import {ChevronDown} from '@tamagui/lucide-icons'
import React, { memo, useEffect, useState } from 'react'
import {useLink} from 'solito/link'
import {LmThemeToggle} from "app/src/components/various/LmThemeToggle";
import {useToggleMainDrawer} from "app/src/state/appState";
import {LmAppDrawer} from "app/src/components/layouts/LmAppDrawer";

export function HomeScreen() {

    const overviewProps = useLink({
        href: '/overview',
    })


    const playgroundProps = useLink({
        href: '/playground',
    })

    return (
        <YStack flex={1} justifyContent="center" alignItems="center" padding="$4" space>
            <YStack space="$4" maxWidth={600}>
            <AnimatedHeading
                  key={`1`}
                  index={10}
                  Component={H1}
                  family={'body'}
                  color="$pink10"
                >
                  Swappable
                </AnimatedHeading>
                <H1 textAlign="center">Welcome to Tamagui.</H1>
                <Separator/>
                <Paragraph textAlign="center" size={'$2'}>
                    Tamagui is made by{' '}
                    <Anchor href="https://twitter.com/natebirdman" target="_blank">
                        Nate Wienert
                    </Anchor>
                    , give it a star{' '}
                    <Anchor href="https://github.com/tamagui/tamagui" target="_blank" rel="noreferrer">
                        on Github
                    </Anchor>
                    .
                </Paragraph>
            </YStack>

            <XStack>
                <LmButton {...overviewProps}>Overview</LmButton>
            </XStack>
            <XStack>
                <LmButton {...playgroundProps}>Playground</LmButton>
            </XStack>
            <XStack>
                <LmThemeToggle>Toggle theme</LmThemeToggle>
            </XStack>
            <SheetDemo/>
        </YStack>
    )
}

function SheetDemo() {
    const toggleMainDrawer = useToggleMainDrawer()

    return (
        <>
            <Button
                size="$6"
                icon={ChevronDown}
                circular
                onPress={() => toggleMainDrawer()}
            />
            <LmAppDrawer/>
        </>
    )
}




const AnimatedHeading = memo(
    ({
      Component,
      children,
      family,
      index,
      ...rest
    }: {
      family: string
      Component: typeof Heading
      children: any
      index: number
    } & TextProps) => {
      return (
        // <Delay by={index * 180}>
          <Component
            animation="lazy"
            enterStyle={{ o: 0}}
            exitStyle={{ o: 0 }}
            o={1}
            pr="$1"
            my="$1"
            $sm={{
              pr: 0,
            }}
            fontFamily={`$${family}`}
            textShadowColor="$shadowColorFocus"
            textShadowRadius={3}
            textShadowOffset={{ width: 0, height: 3 }}
            ellipse
            {...rest}
          >
            {children}
          </Component>
        // </Delay>
      )
    }
  )
  
  const Delay = ({ children, by }) => {
    const isMounted = useDidFinishSSR()
    const [done, setDone] = useState(false)
  
    useEffect(() => {
      const showTimer = setTimeout(() => setDone(true), by)
      return () => clearTimeout(showTimer)
    })
  
    return !isMounted || !done ? null : children
  }
  