import { message } from "antd";
import html2canvas from "html2canvas";
import JsPDF from "jspdf";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export const getFileExtension = (filename: string) => {
  const nameArray = filename.split(".").reverse();

  return filename ? nameArray[0] : "";
};

export const downloadPdf = (
  noDownload = false,
  elementName = "pdfdiv",
  fileName = "Invoice.pdf"
) => {
  const input = document.getElementById(elementName);
  const result = html2canvas(input as HTMLElement, {
    allowTaint: true,
    useCORS: true,
  }).then((canvas) => {
    const doc = new JsPDF("p", "mm", "a4");
    const imgWidth = 200;
    const pageHeight = 290;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 5;

    const img = canvas.toDataURL("image/jpeg");

    doc.addImage(img, "JPEG", 3, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(img, "JPEG", 3, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    if (!noDownload) doc.save(fileName);
    return doc.output("blob");
  });

  return result;
};

export const downloadFile = (fileUrl: string) => {
  const url = fileUrl;
  const e = document.createElement("a");
  e.href = url;
  e.target = "_blank";
  e.download = url.substr(url.lastIndexOf("/") + 1);
  document.body.appendChild(e);
  e.click();
  document.body.removeChild(e);
};

export const showFileValidation = (file: any) => {
  if (file) return true;
  message.warning("Please select a valid File.");
};

export const exportToExcel = ({ apiData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const mapData = apiData.map((data) => ({
    id: data.id,
    ticketNumber: data.ticketNumber,
    status: data.status,
    phoneNumber: data.phoneNumber,
    category: data.category.name,
    department: data.department.name,
    startTime: data.startTime,
    endTime: data.endTime,
    issue: data.issue,
    solved: data.isUnsolved,
    PT: data.branch.name,
  }));

  const ws = XLSX.utils.json_to_sheet(mapData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};
