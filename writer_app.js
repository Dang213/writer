const writer = new NDEFWriter();

//ブラウザがNFCデバイスを拘束するために、scan()を実行しておく
reader.scan();

//プレーンテキストを書き込み
const writeDataText = async () => {
  const writer = new NDEFWriter();
  writer
    .write({
      records: [{ recordType: "text", data: "Test text message." }],
    })
    .then(() => {
      updateStatus("Text written.");
    })
    .catch((_) => {
      updateStatus("Text Write failed.");
    });
};

//JSONを書き込み
const writeDataJson = () => {
  const writer = new NDEFWriter();
  const encoder = new TextEncoder();

  const encoded_text = encoder.encode(
    JSON.stringify({
      name: "toralab",
      type: "company",
    })
  );

  writer
    .write({
      records: [
        {
          recordType: "mime",
          mediaType: "application/json",
          data: encoded_text,
        },
      ],
    })
    .then(() => {
      updateStatus("Json written.");
    })
    .catch((_) => {
      updateStatus("Json Write failed.");
    });
};

//URLを書き込み
const writeDataUrl = () => {
  const writer = new NDEFWriter();
  writer
    .write({
      records: [
        { recordType: "url", data: "https://http://abehiroshi.la.coocan.jp/" },
      ],
    })
    .then(() => {
      updateStatus("Url written.");
    })
    .catch((_) => {
      updateStatus("Url Write failed.");
    });
};

//画像を書き込み
const writeDataImage = async () => {
  const writer = new NDEFWriter();

  const imageblob = await (await fetch("image.png")).arrayBuffer();

  console.log(imageblob);

  writer
    .write({
      records: [
        { recordType: "mime", mediaType: "image/png", data: imageblob },
      ],
    })
    .then(() => {
      updateStatus("Image written.");
    })
    .catch((_) => {
      updateStatus("Image Write failed.");
    });
};

const updateStatus = (str) => {
  $("#status").empty();
  $("#status").text(str);
};

//イベント割り当て
$("#writetext").click(writeDataText);
$("#writejson").click(writeDataJson);
$("#writeurl").click(writeDataUrl);
$("#writeimage").click(writeDataImage);