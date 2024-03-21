package org.furstd.web_api.runner;

import lombok.RequiredArgsConstructor;
import org.furstd.web_api.entity.Author;
import org.furstd.web_api.entity.Book;
import org.furstd.web_api.entity.Role;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.model.author.Nationality;
import org.furstd.web_api.model.book.Genre;
import org.furstd.web_api.model.book.Language;
import org.furstd.web_api.repository.IAuthorRepository;
import org.furstd.web_api.repository.IBookRepository;
import org.furstd.web_api.repository.IRoleRepository;
import org.furstd.web_api.service.user.IUserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class DatabaseRunner implements CommandLineRunner {
    private final IUserService userService;
    private final IRoleRepository roleRepository;
    private final IAuthorRepository authorRepository;
    private final IBookRepository bookRepository;

    @Override
    public void run(String... args) throws Exception {
        Role adminRole = new Role("ADMIN");
        Role editorRole = new Role("EDITOR");
        Role userRole = new Role("USER");

        roleRepository.save(userRole);
        roleRepository.save(editorRole);
        roleRepository.save(adminRole);

        Date birthDate = Date.from(LocalDate.of(2000, 4, 3).atStartOfDay(ZoneId.systemDefault()).toInstant());
        AppUser adminUser = new AppUser("admin@test.cz", "test", "Admin", "Adminovič", birthDate);
        adminUser.addRole(editorRole);
        adminUser.addRole(adminRole);
        userService.createUser(adminUser);

        AppUser editor = new AppUser("editor@test.cz", "test", "Editor", "Editovič", birthDate);
        editor.addRole(editorRole);
        userService.createUser(editor);

        AppUser user = new AppUser("user@test.cz", "test", "User", "Userovič", birthDate);
        userService.createUser(user);

        Author tolkien = new Author("J.R.R.", "Tolkien", Date.from(LocalDate.of(1892, 1, 3).atStartOfDay(ZoneId.systemDefault()).toInstant()), Nationality.BRITISH);
        Author capek = new Author("Karel", "Capek", Date.from(LocalDate.of(1890, 1, 9).atStartOfDay(ZoneId.systemDefault()).toInstant()), Nationality.CZECH);
        Author king = new Author("Stephen", "King", Date.from(LocalDate.of(1947, 9, 21).atStartOfDay(ZoneId.systemDefault()).toInstant()), Nationality.AMERICAN);
        Author christie = new Author("Agatha", "Christie", Date.from(LocalDate.of(1890, 9, 15).atStartOfDay(ZoneId.systemDefault()).toInstant()), Nationality.BRITISH);
        Author rowling = new Author("J.K.", "Rowling", Date.from(LocalDate.of(1965, 7, 31).atStartOfDay(ZoneId.systemDefault()).toInstant()), Nationality.BRITISH);
        Author murakami = new Author("Haruki", "Murakami", Date.from(LocalDate.of(1949, 1, 12).atStartOfDay(ZoneId.systemDefault()).toInstant()), Nationality.JAPANESE);
        Author brown = new Author("Dan", "Brown", Date.from(LocalDate.of(1964, 6, 22).atStartOfDay(ZoneId.systemDefault()).toInstant()), Nationality.AMERICAN);
        Author orwell = new Author("George", "Orwell", Date.from(LocalDate.of(1903, 6, 25).atStartOfDay(ZoneId.systemDefault()).toInstant()), Nationality.BRITISH);
        Author dostoevsky = new Author("Fyodor", "Dostoevsky", Date.from(LocalDate.of(1821, 11, 11).atStartOfDay(ZoneId.systemDefault()).toInstant()), Nationality.RUSSIAN);
        Author verne = new Author("Jules", "Verne", Date.from(LocalDate.of(1828, 2, 8).atStartOfDay(ZoneId.systemDefault()).toInstant()), Nationality.FRENCH);
        authorRepository.save(tolkien);
        authorRepository.save(capek);
        authorRepository.save(king);
        authorRepository.save(christie);
        authorRepository.save(rowling);
        authorRepository.save(murakami);
        authorRepository.save(brown);
        authorRepository.save(orwell);
        authorRepository.save(dostoevsky);
        authorRepository.save(verne);

        Book hobit = new Book("Hobit", tolkien, Genre.FANTASY, Language.CZECH, 242, 1937, 5, "https://www.databazeknih.cz/img/books/32_/324842/bmid_hobit-edice-neoluxor-G7E-324842.jpg");
        Book fellowship = new Book("Společenstvo prstenu", tolkien, Genre.FANTASY, Language.CZECH, 423, 1954, 3, "https://www.databazeknih.cz/img/books/9_/2/bmid_pan-prstenu-spolecenstvo-prstenu-7Bu-2.jpg");
        Book twoTowers = new Book("Dvě věže", tolkien, Genre.FANTASY, Language.CZECH, 352, 1954, 4, "https://www.databazeknih.cz/img/books/29_/29869/bmid_pan-prstenu-dve-veze-geI-29869.jpg");
        Book returnKing = new Book("Návrat krále", tolkien, Genre.FANTASY, Language.CZECH, 416, 1955, 4, "https://www.databazeknih.cz/img/books/26_/260/bmid_navrat-krale-A2D-260.png");
        Book silmarillion = new Book("Silmarillion", tolkien, Genre.FANTASY, Language.CZECH, 365, 1977, 5, "https://www.databazeknih.cz/img/books/28_/286/bmid_silmarillion-VYZ-286.png");
        Book aroundWorld = new Book("Cesta kolem světa za 80 dní", verne, Genre.ROMANCE, Language.CZECH, 256, 1873, 5, "https://www.databazeknih.cz/img/books/61_/61513/bmid_cesta-kolem-sveta-za-osmdesat-dni-BV8-61513.png");
        Book twentyThousand = new Book("20 000 mil pod mořem", verne, Genre.SCIENCE_FICTION, Language.CZECH, 256, 1870, 4, "https://www.databazeknih.cz/img/books/30_/301/bmid_dvacet-tisic-mil-pod-morem-bgw-301.png");
        Book journeyCenter = new Book("Cesta do středu země", verne, Genre.SCIENCE_FICTION, Language.CZECH, 256, 1864, 5, "https://www.databazeknih.cz/img/books/29_/297/bmid_cesta-do-stredu-zeme-s8T-297.jpg");
        Book bilaNemoc = new Book("Bílá nemoc", capek, Genre.DRAMA, Language.CZECH, 256, 1937, 5, "https://www.databazeknih.cz/img/books/68_/687/bmid_bila-nemoc-NUl-687.jpg");
        Book rur = new Book("R.U.R.", capek, Genre.SCIENCE_FICTION, Language.CZECH, 256, 1920, 5, "https://www.databazeknih.cz/img/books/52_/5204/bmid_r-u-r-YYg-5204.jpg");
        Book shining = new Book("Osvícení", king, Genre.HORROR, Language.CZECH, 256, 1977, 5, "https://www.databazeknih.cz/img/books/26_/264/bmid_osviceni-lld-264.jpg");
        Book carrie = new Book("Carrie", king, Genre.HORROR, Language.CZECH, 256, 1974, 5, "https://www.databazeknih.cz/img/books/29_/29670/mid_carrie-EDZ-29670.jpg");
        Book murderOrient = new Book("Vražda v Orient expresu", christie, Genre.DETECTIVE_NOVEL, Language.CZECH, 256, 1934, 5, "https://www.databazeknih.cz/img/books/22_/223/bmid_vrazda-v-orient-expresu-fzj-223.jpg");
        Book deathNile = new Book("Smrt na Nilu", christie, Genre.DETECTIVE_NOVEL, Language.CZECH, 256, 1937, 5, "https://www.databazeknih.cz/img/books/60_/60422/bmid_smrt-na-nilu-BtO-60422.jpg");
        Book gobletFire = new Book("Harry Potter a Ohnivý pohár", rowling, Genre.FANTASY, Language.CZECH, 256, 2000, 5, "https://www.databazeknih.cz/img/books/12_/12/bmid_harry-potter-a-ohnivy-pohar-780-12.jpg");
        Book halfBlood = new Book("Harry Potter a princ dvojí krve", rowling, Genre.FANTASY, Language.CZECH, 256, 2005, 5, "https://www.databazeknih.cz/img/books/36_/368/bmid_harry-potter-a-princ-dvoji-krve-bso-368.jpg");
        Book deathlyHallows = new Book("Harry Potter a Relikvie smrti", rowling, Genre.FANTASY, Language.CZECH, 256, 2007, 5, "https://www.databazeknih.cz/img/books/52_/527948/bmid_harry-potter-a-relikvie-smrti-6572da6e92ac2.jpg");
        Book norwegianWood = new Book("Norské dřevo", murakami, Genre.DRAMA, Language.CZECH, 256, 1987, 5, "https://www.databazeknih.cz/img/books/47_/473407/bmid_norske-drevo-ASM-473407.png");
        Book kafkaShore = new Book("Kafka na pobřeží", murakami, Genre.DRAMA, Language.CZECH, 256, 2002, 5, "https://www.databazeknih.cz/img/books/39_/39121/bmid_kafka-na-pobrezi-pYZ-39121.jpg");
        Book davinciCode = new Book("Da Vinciho kód", brown, Genre.THRILLER, Language.CZECH, 256, 2003, 5, "https://www.databazeknih.cz/img/books/30_/30760/bmid_da-vinciho-kod-5Uf-30760.jpg");
        Book angelsDemons = new Book("Andělé a démoni", brown, Genre.THRILLER, Language.CZECH, 256, 2000, 5, "https://www.databazeknih.cz/img/books/17_/170/bmid_andele-a-demoni-OwC-170.jpg");
        Book animalFarm = new Book("Farma zvířat", orwell, Genre.SATIRE, Language.CZECH, 256, 1945, 5, "https://www.databazeknih.cz/img/books/27_/277/mid_farma-zvirat-ahT-277.jpg");
        Book nineteenEightyFour = new Book("1984", orwell, Genre.SATIRE, Language.CZECH, 256, 1949, 5, "https://www.databazeknih.cz/img/books/28_/283/bmid_1984-tOZ-283.png");
        Book crimePunishment = new Book("Zločin a trest", dostoevsky, Genre.DRAMA, Language.CZECH, 607, 1866, 5, "https://www.databazeknih.cz/img/books/51_/51373/bmid_zlocin-a-trest-Qd5-51373.png");
        bookRepository.save(hobit);
        bookRepository.save(fellowship);
        bookRepository.save(twoTowers);
        bookRepository.save(returnKing);
        bookRepository.save(silmarillion);
        bookRepository.save(aroundWorld);
        bookRepository.save(twentyThousand);
        bookRepository.save(journeyCenter);
        bookRepository.save(bilaNemoc);
        bookRepository.save(rur);
        bookRepository.save(shining);
        bookRepository.save(carrie);
        bookRepository.save(murderOrient);
        bookRepository.save(deathNile);
        bookRepository.save(gobletFire);
        bookRepository.save(halfBlood);
        bookRepository.save(deathlyHallows);
        bookRepository.save(norwegianWood);
        bookRepository.save(kafkaShore);
        bookRepository.save(davinciCode);
        bookRepository.save(angelsDemons);
        bookRepository.save(animalFarm);
        bookRepository.save(nineteenEightyFour);
        bookRepository.save(crimePunishment);
    }
}
