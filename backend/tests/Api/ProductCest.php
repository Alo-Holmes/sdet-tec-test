<?php

namespace App\Tests\Api;

use ApiTester;

class ProductCest
{
    public function testGetProducts(ApiTester $I)
    {
        $I->sendGet('/api/products');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
    }

    public function testGetSingleProduct(ApiTester $I)
    {
        $I->sendGet('/api/products/1');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson(['id' => 1]);
    }

    public function testGetProductsWithWrongMethod(ApiTester $I)
    {
        $I->sendPost('/api/products');
        $I->seeResponseCodeIs(405);
    }

    public function testProductCategories(ApiTester $I)
    {
        $I->sendGet('/api/products');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'category' => 'string'
        ]);
    }

    public function testProductListPagination(ApiTester $I)
    {
        $I->sendGet('/api/products?page=1&limit=10');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseJsonMatchesJsonPath('$.data');
        $I->seeResponseJsonMatchesJsonPath('$.meta.total');
    }

    public function testProductPricing(ApiTester $I)
    {
        $I->sendGet('/api/products/1');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseMatchesJsonType([
            'price' => 'float|integer'
        ]);
    }
}
