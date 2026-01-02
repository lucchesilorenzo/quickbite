<?php

declare(strict_types=1);

namespace App\Services\Shared;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileService
{
    /**
     * Upload a new file.
     */
    public function create(UploadedFile $file, string $folder): string
    {
        $path = $file->store($folder, 'public');

        return '/storage/' . $path;
    }

    /**
     * Update a file: delete old one (if not default) and upload new one.
     */
    public function update(
        ?string $currentPath,
        UploadedFile $newFile,
        string $folder,
        ?string $defaultSubpath = null
    ): string {
        if (! $this->isEmptyPath($currentPath)) {
            $this->deleteIfNotDefault($currentPath, $defaultSubpath);
        }

        return $this->create($newFile, $folder);
    }

    /**
     * Delete a file.
     */
    public function delete(
        ?string $currentPath,
        ?string $defaultSubpath = null
    ): void {
        if (! $this->isEmptyPath($currentPath)) {
            $this->deleteIfNotDefault($currentPath, $defaultSubpath);
        }
    }

    /**
     * Delete file only if it's not a default file.
     */
    private function deleteIfNotDefault(
        string $currentPath,
        ?string $defaultSubpath = null
    ): void {
        // If no default subpath specified, always delete
        // If default subpath specified, delete only if current path doesn't contain it
        if ($defaultSubpath === null || ! str_contains($currentPath, $defaultSubpath)) {
            $this->deleteFile($currentPath);
        }
    }

    /**
     * Delete a file from storage.
     */
    private function deleteFile(string $path): void
    {
        $storagePath = str_replace('/storage/', '', $path);

        if (Storage::disk('public')->exists($storagePath)) {
            Storage::disk('public')->delete($storagePath);
        }
    }

    private function isEmptyPath(?string $path): bool
    {
        return $path === null || $path === '';
    }
}
