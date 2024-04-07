package org.furstd.web_api.controller.profile;

import org.furstd.web_api.dto.ProfileReservationDTO;
import org.furstd.web_api.entity.AppUser;
import org.furstd.web_api.model.util.Msg;
import org.furstd.web_api.service.reservation.IReservationService;
import org.furstd.web_api.service.user.IUserService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;

@RequestMapping("profile/reservations")
@RestController
public class ProfileReservationController extends PrivateController {
    private final IReservationService reservationService;

    public ProfileReservationController(IUserService userService, IReservationService reservationService) {
        super(userService);
        this.reservationService = reservationService;
    }

    @RequestMapping("")
    public ResponseEntity<Object> getReservations(@PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        AppUser user = getLoggedUser();
        return ResponseEntity.ok(reservationService.findByUser(user, pageable));
    }

    @PostMapping("")
    public ResponseEntity<Object> createReservation(@RequestBody ProfileReservationDTO reservationDTO) {
        AppUser user = getLoggedUser();

        LocalDate localNow = LocalDate.now();
        LocalDate localReturnDate = localNow.plusMonths(1);

        Date now = new Date();
        Date returnDate = Date.from(localReturnDate.atStartOfDay().atZone(java.time.ZoneId.systemDefault()).toInstant());

        reservationService.createReservation(user, reservationDTO.getBookIds(), now, returnDate);
        return ResponseEntity.status(HttpStatus.CREATED).body(new Msg("Reservation was created successfully!"));
    }
}
