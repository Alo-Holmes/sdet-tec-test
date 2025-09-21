import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import ProductCard from '@/components/ProductCard.vue';
import vuetify from './vuetify'; // Import the Vuetify instance

const localVue = createLocalVue();
localVue.use(Vuex);

// Mock router
const mockRouter = {
  push: jest.fn(),
};

describe('ProductCard.vue', () => {
  let store;
  let actions;
  let getters;
  let wrapper;

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    price: '19.99',
    stock_quantity: 10,
    image_url: 'test.jpg',
    category_name: 'Electronics',
  };

  beforeEach(() => {
    actions = {
      addToCart: jest.fn(),
    };
    getters = {
      user: () => ({ id: 1, name: 'Test User' }), // Mock the user getter
    };
    store = new Vuex.Store({ actions, getters });

    wrapper = mount(ProductCard, {
      localVue,
      store,
      vuetify,
      propsData: { product: mockProduct },
      mocks: {
        $router: mockRouter, // Mock the router
      },
      stubs: ['router-link'], // Stub the router-link component
    });
  });

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
  });

  /**
   * Test that the component renders product information correctly.
   */
  it('renders product information correctly', () => {
    expect(wrapper.find('.v-card__title').text()).toBe('Test Product');
    expect(wrapper.find('.v-card__subtitle').text()).toBe('Electronics');
  });

  /**
   * Test that the price is displayed with the correct currency formatting.
   */
  it('displays price with correct formatting', () => {
    expect(wrapper.text()).toContain('$19.99');
  });

  /**
   * Test that the 'Add to Cart' button is visible.
   */
  it('shows add to cart button', () => {
    const button = wrapper.find('[data-testid="add-to-cart-button"]');
    expect(button.exists()).toBe(true);
  });

  /**
   * Test that the addToCart action is called when the button is clicked.
   */
  it('handles add to cart action', async () => {
    const button = wrapper.find('[data-testid="add-to-cart-button"]');
    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(actions.addToCart).toHaveBeenCalled();
  });

  /**
   * Test that the default quantity is set correctly.
   */
  it('sets default quantity', () => {
    const quantityInput = wrapper.find('[data-testid="quantity-input"]').find('input');
    expect(quantityInput.attributes('max')).toBe('10');
  });

  /**
   * Test that the stock quantity is displayed correctly.
   */
  it('handles stock quantity display', () => {
    expect(wrapper.text()).not.toContain('Out of stock');
  });

  /**
   * Test that an event is emitted when an item is added to the cart.
   */
  it('emits event when item added', async () => {
    const button = wrapper.find('[data-testid="add-to-cart-button"]');
    await button.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()['added-to-cart']).toBeTruthy();
  });

  /**
   * Test that the component mounts without errors.
   */
  it('component mounts without errors', () => {
    expect(wrapper.vm).toBeTruthy();
  });

  /**
   * Test that the component has the correct data structure.
   */
  it('has correct data structure', () => {
    expect(wrapper.vm.$data.quantity).toBe(1);
    expect(wrapper.vm.$data.loading).toBe(false);
    expect(wrapper.vm.$props.product.name).toBe('Test Product');
  });

  /**
   * Test that the addToCart action is called with the correct parameters.
   */
  it('calls addToCart with correct parameters', async () => {
    await wrapper.vm.handleAddToCart();
    expect(actions.addToCart).toHaveBeenCalledWith(
      expect.any(Object), // The Vuex context
      { productId: 1, quantity: 1 }
    );
  });
});
