/**
 * @description: base64 to blob
 */
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',');
  const typeItem = arr[0];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const mime = typeItem!.match(/:(.*?);/)![1];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const bstr = window.atob(arr[1]!);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    u8arr[n] = bstr.codePointAt(n)!;
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * img url to base64
 * @param url
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as HTMLCanvasElement | null;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const ctx = canvas!.getContext('2d');

    const img = new Image();
    img.crossOrigin = '';
    img.addEventListener('load', () => {
      if (!canvas || !ctx) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return reject();
      }
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(mineType || 'image/png');
      canvas = null;
      resolve(dataURL);
    });
    img.src = url;
  });
}
