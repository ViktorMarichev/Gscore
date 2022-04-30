import React from "react";
import styled from "styled-components";

type ProductDetailsProps = {
  name: string;
  price: number;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ name, price }) => {
  return (
    <Wrapper>
      <ProductTable>
        <DetailsTitles>
          <PackageNameTitle>Package name</PackageNameTitle>
          <PackageNameTitle>Price</PackageNameTitle>
        </DetailsTitles>
        <DetailsPackage>
          <PackageInfo>{name}</PackageInfo>
          <PackageInfo>${price}</PackageInfo>
        </DetailsPackage>
      </ProductTable>
    </Wrapper>
  );
};
const Wrapper = styled.div``;

const ProductTable = styled.div`
  background: ${({ theme }) => theme.colors.signalBlack};
  border-radius: 12px;
  width: 100%;
`;
const DetailsTitles = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.pearlLightGray};
  padding: 42px 72px 32px 32px;

  @media (max-width: 640px) {
    padding: 32px 52px 25px 25px;
  }
`;
const DetailsPackage = styled(DetailsTitles)`
  border: 0;
`;
const DetailsTitle = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: 24px;
  line-height: 34px;
  color: ${({ theme }) => theme.colors.white};

  @media (max-width: 640px) {
    line-height: 10px;
    font-size: 19px;
  }
`;
const PackageInfo = styled.div`
  font-family: "THICCCBOI-regular";
  font-style: normal;
  font-size: 24px;
  line-height: 38px;
  color: ${({ theme }) => theme.colors.white};
  @media (max-width: 640px) {
    line-height: 10px;
    font-size: 19px;
  }
`;
const PackageNameTitle = styled(DetailsTitle)``;
export default ProductDetails;
