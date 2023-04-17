import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Button, Center, HStack, Heading, Select, Text, VStack } from '@chakra-ui/react'
import { getExchangeList } from '../service/requests'

const Home = () => {

    const BASE_VALUE = 'RUB'
    const [baseCurrency, setBaseCurrency] = useState(BASE_VALUE)
    const [exchangeList, setExchangeList] = useState({})

    const getData = () => {
        return getExchangeList(baseCurrency).then(res => setExchangeList(res))
    }

    useEffect(() => {
        console.log(baseCurrency)
        getData()

        const interval = setInterval(() => {
            getData()
            console.log('updated!')
        }, 60000)

        return () => clearInterval(interval)

    }, [baseCurrency])

  return (
    <>
        <Header/>
        <Center>
            <VStack pt='36px'>
                <Select value={baseCurrency} placeholder='Select base currency' onChange={(e) => setBaseCurrency(e.target.value)}>
                    {Object.keys(exchangeList).map((item, id) => {
                        //Delete matches like 1rub = 1rub
                        if (item !== baseCurrency) {
                            return <option key={id}>
                                {item}
                            </option>
                        }
                    })}
                </Select>
                <Heading size='xl' pt='24px' pb='24px'>
                    1 {baseCurrency.toUpperCase()} =
                </Heading>
                <Button onClick={getData}>
                    Refresh Data
                </Button>
                <VStack pt='24px'>
                    {Object.keys(exchangeList).map((item, id) => {
                        //Delete matches like 1rub = 1rub
                        if (item !== baseCurrency){
                            return <Text key={id} cursor='pointer'  onClick={() => setBaseCurrency(item)}>
                                {item}: {exchangeList[item]}
                            </Text>
                        }
                    })}
                </VStack>
            </VStack>
        </Center>
    </>
  )
}

export default Home