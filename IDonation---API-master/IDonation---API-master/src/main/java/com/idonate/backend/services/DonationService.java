package com.idonate.backend.services;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Workbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idonate.backend.domains.Donation;
import com.idonate.backend.repositories.DonationRepository;
import com.idonate.backend.services.exceptions.ObjectNotFoundException;

@Service
public class DonationService {

	private DonationRepository repository;

	@Autowired
	public DonationService(DonationRepository repository) {
		this.repository = repository;
	}

	public List<Donation> findAll() {
		return repository.findAll();
	}

	public List<Donation> findByOng(String id) {
		return repository.findByOng(id);
	}

	public Donation findById(String id) {
		Optional<Donation> optional = repository.findById(id);
		Donation donation = optional.orElseThrow(() -> new ObjectNotFoundException("Doação não encontrada"));
		return donation;
	}

	public List<Donation> findByIdGrantor(String idGrantor) {
		return repository.findByIdGrantor(idGrantor);
	}

	public Donation save(Donation obj) {
		return repository.save(obj);
	}

	public void writeFileCSV(String id) throws IOException {
		List<Donation> donations = findByOng(id);

		String path = new File(".").getCanonicalPath() + "\\RelatorioDePedidos.xls";

		try (FileOutputStream stream = new FileOutputStream(new File(path))) {

			HSSFWorkbook wb = new HSSFWorkbook();
			HSSFSheet sheet = wb.createSheet("Doações");

			int cont = 0;
			int rownum = 0;
			int cellnum = 0;

			Row row = sheet.createRow(rownum++);

			criarColuna(wb, sheet, row, cellnum++, CellStyle.ALIGN_LEFT, "Nome do Doador", Font.BOLDWEIGHT_BOLD);
			criarColuna(wb, sheet, row, cellnum++, CellStyle.ALIGN_LEFT, "Email do doador", Font.BOLDWEIGHT_BOLD);
			criarColuna(wb, sheet, row, cellnum++, CellStyle.ALIGN_CENTER, "CPF/CNPJ", Font.BOLDWEIGHT_BOLD);
			criarColuna(wb, sheet, row, cellnum++, CellStyle.ALIGN_CENTER, "Categoria", Font.BOLDWEIGHT_BOLD);
			criarColuna(wb, sheet, row, cellnum++, CellStyle.ALIGN_JUSTIFY, "Descrição", Font.BOLDWEIGHT_BOLD);
			criarColuna(wb, sheet, row, cellnum++, CellStyle.ALIGN_CENTER, "Data de publicação", Font.BOLDWEIGHT_BOLD);

			insertContent(wb, sheet, donations, cont, rownum);

			wb.write(stream);
			System.out.println("Arquivo Excel criado com sucesso!");

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private void insertContent(HSSFWorkbook wb, HSSFSheet sheet, List<Donation> donations, int cont, int rownum)
			throws IOException {
		if (cont < donations.size()) {
			Donation donation = donations.get(cont);
			if (donation != null) {

				int column = 0;
				Row row = sheet.createRow(rownum++);

				if(donation.getEmpresa() != null) {
					criarColuna(wb, sheet, row, column++, CellStyle.ALIGN_LEFT, donation.getEmpresa().getRazao_social(), null);
					criarColuna(wb, sheet, row, column++, CellStyle.ALIGN_LEFT, donation.getEmpresa().getEmail(), null);
					criarColuna(wb, sheet, row, column++, CellStyle.ALIGN_CENTER, donation.getEmpresa().getPass().getCnpj(), null);
				} else {
					criarColuna(wb, sheet, row, column++, CellStyle.ALIGN_LEFT, donation.getPessoa().getNome(), null);					
					criarColuna(wb, sheet, row, column++, CellStyle.ALIGN_LEFT, donation.getPessoa().getEmail(), null);					
					criarColuna(wb, sheet, row, column++, CellStyle.ALIGN_CENTER, donation.getPessoa().getPass().getCpf(), null);					
				}

				criarColuna(wb, sheet, row, column++, CellStyle.ALIGN_CENTER, donation.getCategoria(), null);					
				criarColuna(wb, sheet, row, column++, CellStyle.ALIGN_JUSTIFY, donation.getDescricao(), null);					
				criarColuna(wb, sheet, row, column++, CellStyle.ALIGN_CENTER, donation.getDataCriacao(), null);					

				cont++;
				insertContent(wb, sheet, donations, cont, rownum);
			}
		}
	}

	private void criarColuna(Workbook wb, HSSFSheet sheet, Row row, int column, Short align, String value,
			Short boldWeight) {
		Cell cell = row.createCell(column);
		CellStyle style = wb.createCellStyle();
		if (boldWeight != null) {
			Font font = wb.createFont();
			font.setBoldweight(boldWeight);
			;
			style.setFont(font);
		}
		style.setAlignment(align);
		cell.setCellValue(value);
		cell.setCellStyle(style);

		sheet.autoSizeColumn(column);
	}

	public void cleanContent(String path) {

		try (FileInputStream stream = new FileInputStream(new File(path))) {

			HSSFWorkbook workbook = new HSSFWorkbook(stream);
			HSSFSheet sheet = workbook.getSheetAt(0);

			int numberOfRows = sheet.getPhysicalNumberOfRows();

			if (numberOfRows > 0) {
				for (int i = sheet.getFirstRowNum(); i <= sheet.getLastRowNum(); i++) {
					if (sheet.getRow(i) != null) {
						sheet.removeRow(sheet.getRow(i));
					} else {
						System.out.println("Info: clean sheet='" + sheet.getSheetName() + "' ... skip line: " + i);
					}
				}
			} else {
				System.out.println("Info: clean sheet='" + sheet.getSheetName() + "' ... is empty");
			}

		} catch (Exception e) {
			e.getStackTrace();
		}

	}

}
