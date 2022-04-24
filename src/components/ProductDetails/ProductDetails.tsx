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
  background: #272727;
  border-radius: 12px;
  width: 100%;
`;
const DetailsTitles = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #969696;
  padding: 42px 72px 32px 32px;
`;
const DetailsPackage = styled(DetailsTitles)`
  border: 0;
`;
const DetailsTitle = styled.div`
  font-family: "THICCCBOI-bold";
  font-style: normal;
  font-size: 24px;
  line-height: 34px;
  color: #ffffff;
`;
const PackageInfo = styled.div`
  font-family: "THICCCBOI-regular";
  font-style: normal;
  font-size: 24px;
  line-height: 38px;
  color: #ffffff;
`;
const PackageNameTitle = styled(DetailsTitle)``;
export default ProductDetails;
