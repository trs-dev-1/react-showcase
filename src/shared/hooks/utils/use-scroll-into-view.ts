type Props = {
  scrollBehavior?: ScrollBehavior;
};

export const useScrollIntoView = (props?: Props) => {
  return (selector: string): void => {
    setTimeout(() => {
      const element = document.querySelector(selector);
      element?.scrollIntoView({ behavior: props?.scrollBehavior || 'smooth' });
    });
  };
};
