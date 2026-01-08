<?php

declare(strict_types=1);

use App\Broadcasting\PartnerChannel;
use App\Broadcasting\UserChannel;
use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{userId}', UserChannel::class);
Broadcast::channel('App.Models.User.{userId}.Restaurant.{restaurantId}', PartnerChannel::class);
