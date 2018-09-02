
function createProxy(originalFunc) {
  return (...originalArgs) => {
    const handlers = originalArgs.filter(arg => typeof arg === 'function');
    // ハンドラーが引数にある場合は、元の関数を実行
    if (handlers.length !== 0) {
      return originalFunc.apply(this, originalArgs);
    }
    // ハンドラーが引数にない場合は、Promiseを返す
    return new Promise((resolve, reject) => {
      const wrapperArgs = originalArgs.slice(0);
      wrapperArgs.push((...args) => resolve.apply(this, args));
      wrapperArgs.push((...args) => reject.apply(this, args));
      originalFunc.apply(this, wrapperArgs);
    });
  };
}

export function polyfill() {
  const originalClient = window.RKZClient;
  if (!originalClient) {
    throw new Error('RKZClient is undefined.');
  }

  const wrapperClient = {};

  // RKZClientの各関数をProxy関数で上書き
  // （RKZClientのプロトタイプのプロパティのみ処理していることに注意）
  Object.keys(Object.getPrototypeOf(originalClient))
    .filter(key => typeof originalClient[key] === 'function')
    .forEach((key) => {
      wrapperClient[key] = createProxy(originalClient[key]);
    });

  wrapperClient.noConflict = originalClient;

  window.RKZClient = wrapperClient;
}
