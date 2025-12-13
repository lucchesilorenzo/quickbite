<?php

declare(strict_types=1);

namespace App\Services\Shared;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageService
{
    /**
     * Upload a new image.
     */
    public function create(UploadedFile $file, string $folder): string
    {
        $path = $file->store($folder, 'public');

        return '/storage/' . $path;
    }

    /**
     * Update an image: delete old one (if not default) and upload new one.
     */
    public function update(
        ?string $currentPath,
        UploadedFile $newFile,
        string $folder,
        ?string $defaultSubpath = null
    ): string {
        // Delete old image if it exists and is not a default image
        if (! in_array($currentPath, [null, '', '0'], true)) {
            $this->deleteIfNotDefault($currentPath, $defaultSubpath);
        }

        return $this->create($newFile, $folder);
    }

    /**
     * Delete an image.
     */
    public function delete(
        ?string $currentPath,
        ?string $defaultSubpath = null
    ): void {
        if (! in_array($currentPath, [null, '', '0'], true)) {
            $this->deleteIfNotDefault($currentPath, $defaultSubpath);
        }
    }

    /**
     * Delete image only if it's not a default image.
     */
    private function deleteIfNotDefault(
        string $currentPath,
        ?string $defaultSubpath = null
    ): void {
        // If no default subpath specified, always delete
        // If default subpath specified, delete only if current path doesn't contain it
        if ($defaultSubpath === null || ! str_contains($currentPath, $defaultSubpath)) {
            $this->deleteImage($currentPath);
        }
    }

    /**
     * Delete an image from storage.
     */
    private function deleteImage(string $path): void
    {
        $storagePath = str_replace('/storage/', '', $path);

        if (Storage::disk('public')->exists($storagePath)) {
            Storage::disk('public')->delete($storagePath);
        }
    }
}
