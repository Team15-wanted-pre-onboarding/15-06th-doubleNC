import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

interface BrandType {
  id: number;
  name: string;
  originalPrice: number;
  minSellingPrice: number;
  count: number;
  imageUrl: string;
}

import moneyAddComma from '../utils/moneyAddComma';

const BrandsForm: React.FC = () => {
  const router = useRouter();
  console.log('---', router.query.data);
  const items = JSON.parse(router.query.data) as string;

  const CalculateDiscountRate = (original: number, minSelling: number): string => {
    return (((original - minSelling) * 100) / original).toFixed(1);
  };

  return (
    <Container>
      <Header>
        <b>{items.length}</b>개의 상품
      </Header>
      {items.map((data) => (
        <Link key={data.id} href={{ pathname: '/items/[id]', query: { name: data.name } }} as={`/items/${data.id}`}>
          <a>
            <ItemBox>
              <img src={data.imageUrl} alt="상품이미지" />
              <div>
                <TextBox>
                  <p>{data.name}</p>
                  <Price>
                    <p>{`${CalculateDiscountRate(data.originalPrice, data.minSellingPrice)}%`}</p>
                    <p>{`${moneyAddComma(data.minSellingPrice)}원`}</p>
                    <p>{`${moneyAddComma(data.originalPrice)}원`}</p>
                  </Price>
                </TextBox>
              </div>
            </ItemBox>
          </a>
        </Link>
      ))}
    </Container>
  );
};
const Container = styled.div`
  a {
    text-decoration: none;
    color: #000000;
  }
`;
const Header = styled.div`
  width: 375px;
  height: 40px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  padding-left: 13px;
  display: flex;
  align-items: center;
  margin-top: 1px;
  margin-bottom: 9px;
  color: #000000;

  background: #ffffff;
`;
const ItemBox = styled.div`
  display: flex;
  align-items: center;
  height: 107.62px;
  background: #ffffff;
  margin: 1px 0;
  padding: 15px 17px 15px 21px;

  & > img {
    width: 70px;
    height: 70px;
  }
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 17px;

  & > p:nth-child(1) {
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 19px;
    text-align: justify;
    margin: 0;
    margin-bottom: 11px;
  }
`;
const Price = styled.div`
  display: flex;
  flex-direction: row;

  & > p:nth-child(1) {
    font-family: sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #ff5757;
    margin: 0;
    margin-right: 9px;
  }

  & > p:nth-child(2) {
    font-family: sans-serif;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    margin: 0;
    margin-right: 6px;
  }
  & > p:nth-child(3) {
    font-family: sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    display: flex;
    align-items: center;
    text-decoration-line: line-through;

    color: #808080;
    margin: 0;
  }
`;
/*
      <Category />
      <List />
*/
export default BrandsForm;
